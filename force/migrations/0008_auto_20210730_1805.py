# Generated by Django 3.1.6 on 2021-07-30 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0007_auto_20210730_1600'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mail',
            name='archived',
        ),
        migrations.RemoveField(
            model_name='mail',
            name='read',
        ),
    ]
