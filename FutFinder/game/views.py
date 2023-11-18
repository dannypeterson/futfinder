from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from dotenv import load_dotenv
from rest_framework import viewsets
import os
from .models import Player
from .serializers import PlayerSerializer
from random import choice
from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View

load_dotenv()

def homepage(response):
    return HttpResponse('Hello worldssdawa')

def select_random_player():
    #TODO make this more efficient with a count?
    pk = Player.objects.values_list('pk', flat=True)
    random_pk = choice(pk)
    random_player = Player.objects.filter(pk=random_pk)
    return random_player

class PlayerViewSet(viewsets.ModelViewSet):
    '''
    API endpoint to send Player data to frontend
    '''
    queryset = select_random_player()
    serializer_class = PlayerSerializer
    # permission_classes = TODO add permissions for api

class PlayerSearchView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('query', '')
        players = Player.objects.filter(name__icontains = query)
        player_names = [{
            'futdb_id': player.futdb_id,
            'name': player.name,
            'position': player.position,
            'club': player.club.futdb_id,
            'nation': player.nationality.futdb_id
        } for player in players]
        return JsonResponse({'players': player_names}, safe=False)

# @csrf_exempt
# def search_box_autofill(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         search_query = data.get('search_query', '')

#         results = Player.objects.filter(name__icontains=search_query)
#         player_list = [{'pk': player.pk, 'name': player.name} for player in results]
#         return JsonResponse({'results': player_list})
#     return JsonResponse({'error': 'Invalid request method'}, status=400)
