from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from dotenv import load_dotenv
from rest_framework import viewsets
import os
from .models import Player
from .serializers import PlayerSerializer

load_dotenv()

def homepage(response):
    return HttpResponse('Hello worldssdawa')
# def homepage(response):
#     context = {}
#     return render(response, 'homepage.html', context)

def get_random_player() -> int:
    """
    Pull out a random player from the db and return their id
    """
    return 1

class PlayerViewSet(viewsets.ModelViewSet):
    '''
    API endpoint to send Player data to frontend
    '''
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    # permission_classes = TODO add permissions for api

