# Generated by Django 3.2.3 on 2021-08-23 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0008_auto_20210730_1805'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='datetime',
            new_name='timestamp',
        ),
    ]