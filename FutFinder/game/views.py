from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from dotenv import load_dotenv
import os

load_dotenv()

def homepage(response):
    return HttpResponse('Hello worldssdawa')
# def homepage(response):
#     context = {}
#     return render(response, 'homepage.html', context)

def populate_db(player_id):
    api_url = f'https://futdb.app/api/players/{player_id}'
    headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': str(os.getenv('FUTDB_API_KEY'))}
    response = requests.get(api_url, headers=headers)
    try:
        data = response.json()
        print(data)
        print('Found player')
    except Exception as e:
        print(e)
    return JsonResponse({'message': "Data populated successfully"})
