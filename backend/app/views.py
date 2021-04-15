import json
from .serializers import *
from .models import *
from .permissions import IsOwner

from django.shortcuts import  get_object_or_404
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse , HttpResponse
from django.contrib.auth.models import User

from rest_framework import viewsets ,generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated , AllowAny 
from rest_framework.decorators import action , permission_classes , api_view
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'name': user.username
        })
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=True , methods=['GET'])
    def getProfile(self,request,pk=None):
        profile = UserProfile.objects.all().filter(user=pk).values()[0] 
        data = json.dumps(profile)
        return JsonResponse(data, safe=False)

    @action(detail=True , methods=['POST'], permission_classes=[AllowAny])
    def editProfile(self,request,pk=None):
        print(request.data)
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == "POST":
            role = request.data['role']
            adress = request.data['adress'] 
            email = request.data['email']
            phone = request.data['phone']
            gender = request.data['gender']
            b = UserProfile(user=user,adress=adress,email=email, phone = phone, gender= gender,role=role)
            b.save()
            return HttpResponse(status=201)

class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=True , methods=['GET'])
    def getHouse(self,request,pk=None):
        house = House.objects.all().filter(user=pk).values()[0] 
        data = json.dumps(house)
        return JsonResponse(data, safe=False)

    @action(detail=True , methods=['POST'], permission_classes=[AllowAny])
    def editHouse(self,request,pk=None):
        print('fuck yasmine')
        print(request.data)
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == "POST":
            size = request.data['size']
            location = request.data['location']
            price = request.data['price']
            description = request.data['description']
            res_places = request.data['res_places']
            b = House(user=user,size=size,location=location, price = price, description= description,res_places=res_places)
            b.save()
            return HttpResponse(status=201)
        return HttpResponse(status=400)