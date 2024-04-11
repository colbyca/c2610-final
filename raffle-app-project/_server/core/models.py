from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class GroceryList(models.Model):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Item(models.Model):
    name = models.TextField()
    purchased = models.BooleanField()
    grocery_list = models.ForeignKey("GroceryList", on_delete=models.CASCADE)

class Raffle(models.Model):
    name = models.TextField()
    description = models.TextField()
    max_tickets = models.IntegerField()
    code = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Ticket(models.Model):
    raffle = models.ForeignKey("Raffle", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)