from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True , 'required':True}}
    def create(self,validated_data): 
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta :
        model = UserProfile
        fields = [ 'user','adress','phone','email','role','gender']

class HouseSerializer(serializers.ModelSerializer):
    class Meta :
        model = House
        fields = ['user','size','location','price','description','res_places']