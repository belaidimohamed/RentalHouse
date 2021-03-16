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
    
class House(models.Model):
    profile = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    size = models.CharField(null=True,max_length=10)
    location = models.CharField(null=True,max_length=50)
    price = models.FloatField(null=True)
    description = models.TextField(null=True)
    res_places = models.CharField(null=True,max_length=5)
    registered_p = models.JSONField(default=dict)