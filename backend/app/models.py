from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE) 
    adress = models.CharField(null=True,max_length=100)
    phone = models.CharField(null=True,max_length=20)
    email = models.EmailField(null=True,max_length=254)
    role = models.CharField(default="locataire",max_length=10) # locataire take , locateur give
    gender = models.CharField(null=True,max_length=10) # false : male , True : female 


    def __str__(self):
        return self.user.username + " - " + self.role  # pylint: disable=no-member