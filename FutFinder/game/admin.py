from django.contrib import admin
from .models import User, Team, Guess, Player

admin.site.register([User, Team, Guess, Player])

