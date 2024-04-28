from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('create_raffle/', views.create_raffle, name="create raffle"),
    path('raffle/<int:id>/edit/', view=views.edit_raffle, name="edit a raffle"),
    path('owned_raffles/', view=views.get_owned_raffles, name="get a user's owned raffles"),
    path('raffle/<int:id>/', views.get_raffle, name="get a raffle"),
    path('find_raffle/', views.find_raffle, name="find a raffle by code"),
    path('join_raffle/<int:id>/', views.join_raffle, name="join a raffle"),
    path('joined_raffles/', views.get_joined_raffles, name="get a user's joined raffles"),
    path('raffle/<int:id>/choose_winner/', views.choose_winner, name="pick's the winner of the raffle"),
    path('raffle/<int:id>/get_winner/', views.get_winner, name="get the winner of the raffle"),
]