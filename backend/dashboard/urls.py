from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MissionDescriptionViewSet, MissionsTechnologyViewSet

router = DefaultRouter()
router.register(r'mission-description', MissionDescriptionViewSet)
router.register(r'missions-technology', MissionsTechnologyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]