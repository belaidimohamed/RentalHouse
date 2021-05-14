# Generated by Django 3.2 on 2021-05-13 17:58

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=10, null=True)),
                ('location', models.CharField(max_length=50, null=True)),
                ('price', models.FloatField(null=True)),
                ('description', models.TextField(null=True)),
                ('registration', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('comments', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('max', models.IntegerField(null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adress', models.CharField(max_length=100, null=True)),
                ('phone', models.CharField(max_length=20, null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('role', models.CharField(default='costumer', max_length=10)),
                ('gender', models.CharField(max_length=10, null=True)),
                ('notifications', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='houses/')),
                ('default', models.BooleanField(default=False)),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.house')),
            ],
        ),
        migrations.CreateModel(
            name='Favorits',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nbplaces', models.IntegerField(null=True)),
                ('status', models.CharField(default='favorit', max_length=10)),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.house')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
