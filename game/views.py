from django.http import HttpResponse, JsonResponse
from dotenv import load_dotenv
from rest_framework import viewsets, permissions
from .models import Player
from .serializers import PlayerSerializer
from random import choice
from django.views import View
from django.core.cache import cache

load_dotenv()


def homepage(response):
    return HttpResponse("Hello worldssdawa")


class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint to send Player data to frontend
    """

    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    # permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        # Check cache for qs
        cached_data = cache.get("random_player_data")
        if cached_data:
            return cached_data

        # If not found, Select a random player
        pk = Player.objects.values_list("pk", flat=True)
        random_pk = choice(pk)
        random_player = Player.objects.filter(pk=random_pk)
        cache.set("random_player_data", random_player, timeout=60 * 60)
        return random_player


class PlayerSearchView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")
        players = Player.objects.filter(name__icontains=query)
        player_names = [
            {
                "futdb_id": player.futdb_id,
                "name": player.name,
                "position": player.position,
                "club": player.club.futdb_id,
                "nation": player.nationality.futdb_id,
            }
            for player in players
        ]
        return JsonResponse({"players": player_names}, safe=False)
