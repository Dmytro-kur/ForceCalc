# Generated by Django 3.2.3 on 2021-07-11 20:44

from django.db import migrations, models
import force.models


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='angles',
            name='N',
            field=models.FloatField(validators=[force.models.validate_contact_angle]),
        ),
    ]
