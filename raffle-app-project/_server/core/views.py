from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Raffle, Ticket, User
from django.http import HttpRequest
from django.forms.models import model_to_dict
from random import choice
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
def create_raffle(req: HttpRequest):
    body = json.loads(req.body)

    if not body["raffleTitle"] \
    or not body["raffleDesc"] \
    or not body["maxTickets"] \
    or not body["raffleCode"] \
    or not body["raffleWinDet"]:
        return JsonResponse({"success": "false", "error": "You must fill out all input fields!"})
    
    print(body["raffleEndDate"])
    raffle = Raffle(
        name=body["raffleTitle"],
        description=body["raffleDesc"],
        max_tickets=int(body["maxTickets"]),
        code=body["raffleCode"],
        finished=False,
        winner_details=body["raffleWinDet"],
        winner="",
        user=req.user
    )
    raffle.save()
    
    return JsonResponse({"success": True})

@login_required
def get_owned_raffles(req: HttpRequest):
    raffles = Raffle.objects.filter(user=req.user)
    return JsonResponse({"raffles": [model_to_dict(raffle) for raffle in raffles]})

@login_required
def get_joined_raffles(req: HttpRequest):
    tickets = Ticket.objects.filter(user=req.user)
    raffles = []
    for ticket in tickets:
        raffles.append(ticket.raffle)
    return JsonResponse({"joinedRaffles": [model_to_dict(raffle) for raffle in raffles]})

@login_required
def edit_raffle(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    body = json.loads(req.body)

    if req.user != raffle.user:
        return JsonResponse({"success": "false", "error": "You do not own this raffle!"})

    if not body["raffleTitle"] \
    or not body["raffleDesc"] \
    or not body["raffleWinDet"]:
        return JsonResponse({"success": "false", "error": "You must fill out all input fields!"})
    
    raffle.name = body["raffleTitle"]
    raffle.description = body["raffleDesc"]
    raffle.winner_details = body["raffleWinDet"]
    raffle.save()

    return JsonResponse({"success": "true", "error": ""})

@login_required
def get_raffle(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    tickets = Ticket.objects.filter(raffle_id=raffle.id)
    joined = False
    for ticket in tickets:
        if ticket.user == req.user:
            joined = True
    is_owner = raffle.user == req.user

    return JsonResponse({"raffle": model_to_dict(raffle), "isOwner": is_owner, "joined": joined, "numTickets": len(tickets)})

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
    tickets = Ticket.objects.filter(raffle_id=raffle.id)

    if raffle.user == req.user:
        return JsonResponse({"success": "false", "error":"Cannot join! You own this Raffle!"})
    
    if Ticket.objects.filter(user_id=req.user, raffle_id=raffle.id).exists():
        return JsonResponse({"success": "false", "error":"You have already joined this Raffle!"})
    
    if len(tickets) >= raffle.max_tickets:
        return JsonResponse({"success": "false", "error":"There are no more spots left in this raffle!"})
    
    ticket = Ticket(raffle=raffle, user=req.user)
    ticket.save()
    return JsonResponse({"success": "true", "error":""})

@login_required
def choose_winner(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    if req.user != raffle.user:
        return JsonResponse({"success": "false", "error": "You do not own this raffle!"})
    if raffle.finished == True:
        return JsonResponse({"success": "false", "error": "This raffle has already finished!"})

    tickets = Ticket.objects.filter(raffle_id=raffle.id)

    if len(tickets) == 0:
        return JsonResponse({"success": "false", "error": "There are no tickets in this raffle yet!"})

    winner = choice(tickets).user
    raffle.winner = winner.email
    raffle.finished = True
    raffle.save()

    return JsonResponse({"success": "true", "error": ""})

@login_required
def get_winner(req: HttpRequest, id):
    raffle = Raffle.objects.get(pk=id)
    winner = User.objects.get(email=raffle.winner)
    if req.user != raffle.user:
        return JsonResponse({"success": "false", "error": "You do not own this raffle!", "winner": ""})
    if not raffle.winner:
        return JsonResponse({"success": "false", "error": "You have not chosen a winner!", "winner": ""})
    return JsonResponse({"success": "true", "winner": model_to_dict(winner)})