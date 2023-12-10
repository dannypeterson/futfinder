from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PlayerSearchView

router = routers.DefaultRouter()
router.register(r"player", views.RandomPlayerViewSet, "player")

urlpatterns = [
    path("", views.homepage, name="home"),
    path("api/", include(router.urls), name="api"),
    path("search-players/", PlayerSearchView.as_view(), name="player-search"),
]
