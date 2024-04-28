from django.db import models
from django.contrib.auth.models import User

class Raffle(models.Model):
    name = models.TextField()
    description = models.TextField()
    max_tickets = models.IntegerField()
    code = models.TextField()
    finished = models.BooleanField()
    winner = models.TextField()
    winner_details = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Ticket(models.Model):
    raffle = models.ForeignKey("Raffle", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)