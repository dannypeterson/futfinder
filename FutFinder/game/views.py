from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from dotenv import load_dotenv
from rest_framework import viewsets
import os
from .models import Player
from .serializers import PlayerSerializer
from random import choice

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

