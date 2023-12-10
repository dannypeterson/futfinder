from django.db import models
from datetime import date
import requests
import os


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return self.username


class Club(models.Model):
    futdb_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name


class Nation(models.Model):
    futdb_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name


class Player(models.Model):
    name = models.CharField(max_length=255, unique=True)
    futdb_id = models.IntegerField()
    nationality = models.ForeignKey(Nation, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    dob = models.DateField()
    position = models.CharField(max_length=3)
    rating = models.IntegerField()
    pace = models.IntegerField()
    shooting = models.IntegerField()
    passing = models.IntegerField()
    dribbling = models.IntegerField()
    defending = models.IntegerField()
    physicality = models.IntegerField()

    def __str__(self):
        return self.name

    @property
    def age(self) -> int:
        today = date.today()
        age = today.year - self.dob.year
        return age

class DailyRandomPlayer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
