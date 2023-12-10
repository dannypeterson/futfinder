from django.core.management.base import BaseCommand
from game.models import Player, DailyRandomPlayer
from random import choice
from django.core.cache import cache

class Command(BaseCommand):
    help = 'Create DailyRandomPlayer instance at 9 am every day'

    def handle(self, *args, **options):
        pk_list = Player.objects.values_list("pk", flat=True)
        random_pk = choice(pk_list)
        try:
            random_player = Player.objects.get(pk=random_pk)
            daily_player, created = DailyRandomPlayer.objects.get_or_create(player = random_player)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created DailyRandomPlayer with player: {random_player.name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'DailyRandomPlayer already exists todat with player: {random_player.name}'))
        except Player.DoesNotExist:
            self.stdout.write(self.style.ERROR('No player found with the selected random ID.'))
        except DailyRandomPlayer.DoesNotExist:
            self.stdout.write(self.style.ERROR('Error occurred while creating/updating DailyRandomPlayer.'))
