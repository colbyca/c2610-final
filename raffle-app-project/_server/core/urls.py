from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('grocery_lists/', views.create_list, name="create_list"),
    path('create_raffle/', views.create_raffle, name="create raffle"),
    path('edit_raffle/<int:id>', view=views.edit_raffle, name="edit a raffle"),
    path('owned_raffles/', view=views.get_ownedRaffles, name="get user's raffles"),
    path('raffle/<int:id>', views.get_raffle, name="get a raffle"),
    path('create_ticket/', views.create_ticket, name="get a raffle"),
]