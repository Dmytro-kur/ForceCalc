# Generated by Django 3.1.6 on 2021-06-17 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='variables',
            old_name='N',
            new_name='NR',
        ),
    ]