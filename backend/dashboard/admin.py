from django.contrib import admin
from .models import MissionDescription, MissionsTechnology

class MissionDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'mission_name', 'country', 'organization', 'type', 'status', 'launch_date', 'launchers')  # Include new fields
    list_filter = ('type', 'status')  # Corrected field names
    search_fields = ('mission_name', 'country', 'organization')

admin.site.register(MissionDescription, MissionDescriptionAdmin)

@admin.register(MissionsTechnology)
class MissionsTechnologyAdmin(admin.ModelAdmin):
    list_display = ('id', 'mission_name', 'payload', 'frequency_band', 'data_rate', 'communication_protocol', 'created_at')
    search_fields = ('mission_name', 'payload', 'frequency_band')
    list_filter = ('created_at',)