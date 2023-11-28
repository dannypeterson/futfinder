from django.contrib import admin
from .models import User, Club, Player, Nation

admin.site.register([User, Club, Player, Nation])

