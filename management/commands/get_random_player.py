from game.views import PlayerViewSet
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Get random player at 9am every day'

    def handle(self, *args, **options):
        player_view = PlayerViewSet()
        player_view.get_queryset()
        self.stdout.write(self.style.SUCCESS('Successfully updated random player'))
