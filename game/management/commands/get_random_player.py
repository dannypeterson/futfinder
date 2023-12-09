from django.core.management.base import BaseCommand
from game.models import Player
from random import choice
from django.core.cache import cache

def schedule_player():
    pk = Player.objects.values_list("pk", flat=True)
    random_pk = choice(pk)
    random_player = Player.objects.filter(pk=random_pk)
    cache.set("scheduled_player", random_player, timeout=60 * 60 * 23)  # Cache for 23 hours
    return random_player

class Command(BaseCommand):
    help = 'Get random player at 9 am every day'

    def handle(self, *args, **options):
        scheduled_player = schedule_player()
        self.stdout.write(self.style.SUCCESS('Successfully updated scheduled player'))
        return scheduled_player
