# Generated by Django 3.2 on 2021-06-13 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='coordinates',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='house',
            name='date_of_post',
            field=models.DateTimeField(null=True),
        ),
    ]
