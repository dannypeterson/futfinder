from django.http import HttpResponse, JsonResponse
from dotenv import load_dotenv
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Player, DailyRandomPlayer
from .serializers import RandomPlayerSerializer
from random import choice
from django.views import View
from django.core.cache import cache


load_dotenv()


def homepage(response):
    return HttpResponse("Hello worldssdawa")


class RandomPlayerViewSet(viewsets.ModelViewSet):
    """
    Get random player HTTP response
    """

    serializer_class = RandomPlayerSerializer
    # permission_classes = [permissions.IsAdminUser]
    def get_queryset(self):
        latest_instance = DailyRandomPlayer.objects.latest('id')
        return DailyRandomPlayer.objects.filter(id=latest_instance.id)


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
