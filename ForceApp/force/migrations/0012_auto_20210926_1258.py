# Generated by Django 3.2.3 on 2021-09-26 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('force', '0011_auto_20210926_1256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='angles',
            name='angles_key',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='contact',
            name='contact_key',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='plunger',
            name='plunger_key',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='spring',
            name='spring_key',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='variables',
            name='variables_key',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]