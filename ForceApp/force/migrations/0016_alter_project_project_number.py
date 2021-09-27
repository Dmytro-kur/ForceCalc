# Generated by Django 3.2.3 on 2021-09-27 19:56

from django.db import migrations, models
import force.models


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0015_auto_20210927_1952'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='project_number',
            field=models.CharField(max_length=6, unique=True, validators=[force.models.validate_project_number]),
        ),
    ]
