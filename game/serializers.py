from rest_framework import serializers
from .models import Player, Club, Nation


class NationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nation
        fields = ["futdb_id"]


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ["futdb_id"]


class PlayerSerializer(serializers.ModelSerializer):
    club = ClubSerializer()
    nationality = NationSerializer()

    class Meta:
        model = Player
        fields = [
            "name",
            "futdb_id",
            "nationality",
            "club",
            "age",
            "position",
            "rating",
            "pace",
            "shooting",
            "passing",
            "dribbling",
            "defending",
            "physicality",
        ]
