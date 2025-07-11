from rest_framework import serializers
from .models import MissionDescription, MissionsTechnology

class MissionDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionDescription
        fields = '__all__'

class MissionsTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionsTechnology
        fields = '__all__'
        