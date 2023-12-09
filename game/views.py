from django.http import HttpResponse, JsonResponse
from dotenv import load_dotenv
from rest_framework import viewsets, permissions
from .models import Player
from .serializers import PlayerSerializer
from random import choice
from django.views import View
from django.core.cache import cache
from .management.commands.get_random_player import schedule_player

load_dotenv()


def homepage(response):
    return HttpResponse("Hello worldssdawa")


class PlayerViewSet(viewsets.ModelViewSet):
    """
    Get random player HTTP response
    """

    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    # permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        # return scheduled player from cache
        scheduled_player = cache.get("scheduled_player")
        if scheduled_player:
            return scheduled_player

        pk = Player.objects.values_list("pk", flat=True)
        random_pk = choice(pk)
        random_player = Player.objects.filter(pk=random_pk)
        return random_player


class PlayerSearchView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")
        players = Player.objects.filter(name__icontains=query)
        player_info = [
            {
                "futdb_id": player.futdb_id,
                "name": player.name,
                "position": player.position,
                "club": player.club.futdb_id,
                "nation": player.nationality.futdb_id,
            }
            for player in players
        ]
        return JsonResponse({"players": player_info}, safe=False)
