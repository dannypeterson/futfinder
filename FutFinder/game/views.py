from django.shortcuts import render
from django.http import HttpResponse

def homepage(response):
    return HttpResponse('Hello worldssdawa')
# def homepage(response):
#     context = {}
#     return render(response, 'homepage.html', context)
