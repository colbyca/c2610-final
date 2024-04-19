from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import GroceryList, Item, Raffle, Ticket
from django.http import HttpRequest
from django.forms.models import model_to_dict
# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)


@login_required
def create_list(req):
    body =  json.loads(req.body)
    # TODO validate data
    grocery_list = GroceryList(
        name=body["name"],
        user=req.user
    )
    grocery_list.save()
    for item_name in body["items"]:
        item = Item(
            grocery_list=grocery_list,
            name=item_name,
            purchased=False
        )
        item.save()
    return JsonResponse({"success": True})

@login_required
def grocery_lists(req):
    print(req.method)
    if req.method == "POST":
        body =  json.loads(req.body)
        # TODO validate data
        grocery_list = GroceryList(
            name=body["name"],
            user=req.user
        )
        grocery_list.save()
        for item_name in body["items"]:
            item = Item(
                grocery_list=grocery_list,
                name=item_name,
                purchased=False
            )
            item.save()
        return JsonResponse({"success": True})
    else:
        lists = GroceryList.objects.filter(user=req.user)
        lists = [model_to_dict(list) for list in lists]
        print(lists)
        return JsonResponse({ "groceryLists": lists })

def create_raffle(req: HttpRequest):
    body = json.loads(req.body)
    # validate data
    raffle = Raffle(
        name=body["raffleTitle"],
        description=body["raffleDesc"],
        max_tickets=int(body["maxTickets"]),
        code=body["raffleCode"],
        user=req.user
    )
    raffle.save()
    
    return JsonResponse({"success": True})

@login_required
def get_ownedRaffles(req: HttpRequest):
    raffles = [model_to_dict(raffle) for raffle in Raffle.objects.filter(user=req.user)]
    return JsonResponse({"raffles": raffles})

def get_joinedRaffles(req: HttpRequest):
    tickets = Ticket.objects.filter(user=req.user)
    raffles = []
    for ticket in tickets:
        raffles.append(ticket.raffle)
    raffles = [model_to_dict(raffle) for raffle in raffles]
    print(raffles)
    return JsonResponse({"joinedRaffles": raffles})

@login_required
def edit_raffle(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    body = json.loads(req.body)

    # Validate data
    raffle.name = body["raffleTitle"]
    raffle.description = body["raffleDesc"]
    raffle.save()
    return JsonResponse({"success": "true"})

@login_required
def get_raffle(req: HttpRequest, id):
    raffle = model_to_dict(Raffle.objects.get(pk=id))

    return JsonResponse({"raffle": raffle})

@login_required
def find_raffle(req: HttpRequest):
    body = json.loads(req.body)
    if Raffle.objects.filter(code=body["raffleCode"]).exists():
        raffle = model_to_dict(Raffle.objects.get(code=body["raffleCode"]))
        return JsonResponse({"success": "true", "raffle": raffle})
    else:
        return JsonResponse({"success": "false", "raffle": ""})
    
@login_required
def join_raffle(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    ticket = Ticket(raffle=raffle, user=req.user)
    ticket.save()
    return JsonResponse({"success": "true"})

# def create_raffle(req: HttpRequest):
#     return JsonResponse()