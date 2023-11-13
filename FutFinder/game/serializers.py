from rest_framework import serializers
from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    # can I send age thru? how will images be sent thru if i add them to db?
    class Meta:
        model = Player
        fields = ["name", "futdb_id", "nationality", "club", "age", "position", "rating", "pace", "shooting", "passing", "dribbling", "defending", "physicality"]
