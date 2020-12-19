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
    permission_classes = (IsAuthenticated,)

    @action(detail=True , methods=['GET'])
    def getProfile(self,request,pk=None):
        profile = UserProfile.objects.all().filter(user=pk).values()[0] 
        data = json.dumps(profile)
        return JsonResponse(data, safe=False)

    @action(detail=True , methods=['POST'], permission_classes=[IsOwner])
    def editProfile(self,request,pk=None):
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == "POST":
            role = request.POST['role']
            adress = request.POST['adress'] 
            email = request.POST['email']
            phone = request.POST['phone']
            gender = request.POST['gender']
            b = UserProfile(user=user,adress=adress,email=email, phone = phone, gender= gender,role=role)
            b.save()
            return HttpResponse(status=201)