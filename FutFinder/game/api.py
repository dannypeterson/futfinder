from django.shortcuts import render
import requests
from dotenv import load_dotenv
import os
from .models import Player, Nation, Club

load_dotenv()

def populate_db(player_id: int):
    #make an HTTP request to FutDB for playerid, return dict of wanted info
    api_url = f'https://futdb.app/api/players/{player_id}'
    headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))}
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
            player_data = response.json()
            player_data = player_data.get('player', '')
            player_info = {
                'futdb_id': player_data.get('id', 0),
                'name': player_data.get('name', ''),
                'dob': player_data.get('birthDate', ''),
                'nation_id': player_data.get('nation', ''),
                'club_id': player_data.get('club', ''),
                'position': player_data.get('position', ''),
                'rating': player_data.get('rating', 0),
                'pace': player_data.get('pace', 0),
                'shooting': player_data.get('shooting', 0),
                'passing': player_data.get('passing', 0),
                'dribbling': player_data.get('dribbling', 0),
                'defending': player_data.get('defending', 0),
                'physicality': player_data.get('physicality', 0),
            }
            return player_info
    else:
        print(f"API request failed with status code {response.status_code}")

def get_or_create_club(futdb_club_id: int):
    try:
        club = Club.objects.get(futdb_id = futdb_club_id)
        return club
    except Club.DoesNotExist:
        api_url = f'https://futdb.app/api/clubs/{futdb_club_id}'
        headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))}
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        club_data = response.json()
        club = Club.objects.create(
            futdb_id = futdb_club_id, name = club_data['name']
        )
        return club
    else:
        print(f"API request failed with status code: {response.status_code}")
        return None


def create_player(player_info: dict):
    # create Player model instance from dictionary, use populate_db(futdb id)
    new_player = Player(
        futdb_id = player_info['futdb_id'],
        name = player_info['name'],
        dob = player_info['dob'],
        position = player_info['position'],
        rating = player_info['rating'],
        pace = player_info['pace'],
        shooting = player_info['shooting'],
        passing = player_info['passing'],
        dribbling = player_info['dribbling'],
        defending = player_info['defending'],
        physicality = player_info['physicality'],
        nationality = Nation.objects.get(futdb_id=player_info['nation_id']),
        club = get_or_create_club(player_info['club_id'])
    )
    new_player.save()
    print("Player created")

def get_nations(page):
    # add futDB nations to db based on page
    api_url = f'https://futdb.app/api/nations?page={page}'
    headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))}
    response = requests.get(api_url, headers=headers)
    nations = response.json()['items']
    for nation in nations:
        new_nation = Nation(futdb_id=nation['id'], name=nation['name'])
        new_nation.save()
    print(f"Page {page} saved to models")

def get_clubs(page):
    # add futDB nations to db based on page
    api_url = f'https://futdb.app/api/clubs?page={page}'
    headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))}
    response = requests.get(api_url, headers=headers)
    clubs = response.json()['items']
    for club in clubs:
        new_club = Club(futdb_id=club['id'], name=club['name'])
        new_club.save()
    print(f"Page {page} saved to models")

def get_player_image(player_id):
    api_url = f'https://futdb.app/api/players/{player_id}/image'
    headers = {
        'accept': 'image/png',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))
    }
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        print(response)
