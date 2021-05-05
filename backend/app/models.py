from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    adress = models.CharField(null=True, max_length=100)
    phone = models.CharField(null=True, max_length=20)
    email = models.EmailField(null=True, max_length=254)
    # locataire take , locateur give
    role = models.CharField(default="locataire", max_length=10)
    # false : male , True : female
    gender = models.CharField(null=True, max_length=10)

    def __str__(self):
        return self.user.username + " - " + self.role  # pylint: disable=no-member


class House(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    size = models.CharField(null=True, max_length=10)
    location = models.CharField(null=True, max_length=50)
    price = models.FloatField(null=True)
    description = models.TextField(null=True)
    res_places = JSONField(default=dict)
    registered_p = models.JSONField(default=dict)
    comments = JSONField(null=True)

    def __str__(self):
        return str(self.owner) + " - " + self.location + " - " + str(self.price)  # pylint: disable=no-member


class Favorits(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    house = models.ForeignKey(House, on_delete=models.CASCADE)
    reserved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user) + " - " + str(self.house) + " - " + str(self.reserved)  # pylint: disable=no-member


class Image(models.Model):
    house = models.ForeignKey(House, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='houses/')
    default = models.BooleanField(default=False)

    def __str__(self):
        return str(self.house) + " - "
