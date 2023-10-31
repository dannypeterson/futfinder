from django.db import models
from . import constants

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    strikes = models.SmallIntegerField(default=0)

    def __str__(self) -> str:
        return self.username

class Team(models.Model):
    name = models.CharField(max_length=255, choices=constants.Teams.choices)
    league = models.CharField(max_length=255, choices=constants.Leagues.choices)

    def __str__(self) -> str:
        return self.name

class Player(models.Model):
    name = models.CharField(max_length=200, unique=True)
    age = models.IntegerField()
    position = models.CharField(max_length=3, choices=constants.PlayerPositions.choices)
    nationality = models.CharField(max_length=255, choices = constants.PlayerNationalities.choices)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Guess(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Guess by {self.user.username} on {self.player.name} is {self.is_correct}!'
