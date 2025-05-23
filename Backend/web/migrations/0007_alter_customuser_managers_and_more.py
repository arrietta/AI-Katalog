# Generated by Django 5.1.6 on 2025-04-07 20:31

import web.managers
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0006_remove_customuser_username'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
                ('objects', web.managers.CustomUserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='birth_date',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='city',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='phone_number',
        ),
    ]
