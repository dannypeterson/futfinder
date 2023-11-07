from django.contrib import admin
from .models import User, Club, Guess, Player, Nation

admin.site.register([User, Club, Guess, Player, Nation])

