from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'player', views.PlayerViewSet, 'player')

urlpatterns = [
    path("", views.homepage, name="home"),
    path('', include(router.urls)),
]
