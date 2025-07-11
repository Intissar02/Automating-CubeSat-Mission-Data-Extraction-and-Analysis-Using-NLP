# from django.contrib import admin
# from .models import MissionDescription, MissionsTechnology

# class MissionDescriptionAdmin(admin.ModelAdmin):
#     list_display = ('id', 'mission_name', 'country', 'organization', 'type', 'status', 'launch_date', 'launchers')  
#     list_filter = ('type', 'status')  
#     search_fields = ('mission_name', 'country', 'organization')

# admin.site.register(MissionDescription, MissionDescriptionAdmin)

# @admin.register(MissionsTechnology)
# class MissionsTechnologyAdmin(admin.ModelAdmin):
#     list_display = ('id', 'mission_name', 'payload', 'frequency_band', 'data_rate', 'communication_protocol', 'created_at')
#     search_fields = ('mission_name', 'payload', 'frequency_band')
#     list_filter = ('created_at',)

from django.contrib import admin
from .models import MissionDescription, MissionsTechnology

@admin.register(MissionsTechnology)
class MissionsTechnologyAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_mission_name', 'payload', 'created_at')
    search_fields = ('mission_name',)
    list_filter = ('created_at',)
    
    def get_mission_name(self, obj):
        return obj.mission_name
    get_mission_name.short_description = 'Mission Name'

@admin.register(MissionDescription)
class MissionDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'mission_name', 'country', 'launch_date')
    search_fields = ('mission_name', 'country')
    list_filter = ('launch_date', 'status')