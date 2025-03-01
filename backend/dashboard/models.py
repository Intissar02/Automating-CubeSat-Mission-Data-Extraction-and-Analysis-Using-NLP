from django.db import models
import uuid
import logging

# Create a logger
logger = logging.getLogger(__name__)

class MissionDescription(models.Model):
    mission_name = models.TextField()
    country = models.TextField()
    organization = models.TextField()
    type = models.TextField()
    launch_date = models.DateField()
    orbit_type = models.TextField()
    altitude = models.TextField(null=True, blank=True)  # Altitude (optional)
    inclination = models.TextField(null=True, blank=True)  # Inclination (optional)
    status = models.TextField()  # Mission status
    mission_objectives = models.TextField(null=True, blank=True)  # Mission objectives (optional)
    launchers = models.CharField(max_length=255, blank=True, null=True)  # Launchers (optional)

    def __str__(self):
        return self.mission_name

    def save(self, *args, **kwargs):
        logger.info(f"Saving MissionDescription instance with id {self.id} and mission_name {self.mission_name}")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        logger.info(f"Deleting MissionDescription instance with id {self.id} and mission_name {self.mission_name}")
        super().delete(*args, **kwargs)

    class Meta:
        db_table = 'mission_description'  # Matches PostgreSQL table name, case-sensitive


class MissionsTechnology(models.Model):
    id = models.IntegerField(primary_key=True)  # Matches 'id' as integer in PostgreSQL schema
    mission_name = models.CharField(max_length=255)  # Mission name
    payload = models.CharField(max_length=255, null=True, blank=True)  # Payload (optional)
    frequency_band = models.CharField(max_length=255, null=True, blank=True)  # Frequency band (optional)
    data_rate = models.CharField(max_length=255, null=True, blank=True)  # Data rate (optional)
    communication_protocol = models.CharField(max_length=255, null=True, blank=True)  # Communication protocol (optional)
    modulation = models.CharField(max_length=255, null=True, blank=True)  # Modulation (optional)
    obc = models.TextField(null=True, blank=True)  # On-Board Computer (optional)
    com = models.CharField(max_length=255, null=True, blank=True)  # Communications System (optional)
    adcs = models.FloatField(null=True, blank=True)  # Attitude Control System (optional)
    eps = models.FloatField(null=True, blank=True)  # Power System (optional)
    antenna = models.TextField(null=True, blank=True)  # Antenna System (optional)
    created_at = models.DateTimeField(auto_now_add=True)  # Record creation timestamp

    def __str__(self):
        return f"{self.mission_name} (ID: {self.id})"

    def save(self, *args, **kwargs):
        logger.info(f"Saving MissionsTechnology instance with id {self.id} and mission_name {self.mission_name}")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        logger.info(f"Deleting MissionsTechnology instance with id {self.id} and mission_name {self.mission_name}")
        super().delete(*args, **kwargs)

    class Meta:
        db_table = 'missions_technology_v2'  # Matches PostgreSQL table name