# Generated by Django 5.1.6 on 2025-03-01 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MissionDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mission_name', models.TextField()),
                ('country', models.TextField()),
                ('organization', models.TextField()),
                ('type', models.TextField()),
                ('launch_date', models.DateField()),
                ('orbit_type', models.TextField()),
                ('altitude', models.TextField(blank=True, null=True)),
                ('inclination', models.TextField(blank=True, null=True)),
                ('status', models.TextField()),
                ('mission_objectives', models.TextField(blank=True, null=True)),
                ('launchers', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'mission_description',
            },
        ),
        migrations.CreateModel(
            name='MissionsTechnology',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('mission_name', models.CharField(max_length=255)),
                ('payload', models.CharField(blank=True, max_length=255, null=True)),
                ('frequency_band', models.CharField(blank=True, max_length=255, null=True)),
                ('data_rate', models.CharField(blank=True, max_length=255, null=True)),
                ('communication_protocol', models.CharField(blank=True, max_length=255, null=True)),
                ('modulation', models.CharField(blank=True, max_length=255, null=True)),
                ('obc', models.TextField(blank=True, null=True)),
                ('com', models.CharField(blank=True, max_length=255, null=True)),
                ('adcs', models.FloatField(blank=True, null=True)),
                ('eps', models.FloatField(blank=True, null=True)),
                ('antenna', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'missions_technology_v2',
            },
        ),
    ]
