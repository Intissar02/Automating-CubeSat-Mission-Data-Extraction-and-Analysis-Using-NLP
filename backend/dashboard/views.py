from rest_framework import viewsets
from .models import MissionDescription, MissionsTechnology
from .serializers import MissionDescriptionSerializer, MissionsTechnologySerializer

class MissionDescriptionViewSet(viewsets.ModelViewSet):
    queryset = MissionDescription.objects.all()
    serializer_class = MissionDescriptionSerializer

class MissionsTechnologyViewSet(viewsets.ModelViewSet):
    queryset = MissionsTechnology.objects.all()
    serializer_class = MissionsTechnologySerializer