from django.urls import path, include
from . import views
from rest_framework import routers
from .views import search_box_autofill

router = routers.DefaultRouter()
router.register(r'player', views.PlayerViewSet, 'player')

urlpatterns = [
    path("", views.homepage, name="home"),
    path('', include(router.urls)),
    path('api/search-players/', search_box_autofill, name='search_players')
]
