from django.db import models
from datetime import date

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    strikes = models.SmallIntegerField(default=0)

    def __str__(self) -> str:
        return self.username

class Club(models.Model):
    futdb = models.IntegerField(unique=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name

class Nation(models.Model):
    futdb = models.IntegerField(unique=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name

class Player(models.Model):
    name = models.CharField(max_length=255, unique=True)
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
    def age(self):
        today = date.today()
        age = today.year - self.dob.year
        return age

class Guess(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Guess by {self.user.username} on {self.player.name} is {self.is_correct}!'
