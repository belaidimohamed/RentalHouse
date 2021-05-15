import json
from ..serializers import *
from ..models import *
from ..permissions import IsOwner

from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
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

    @action(detail=True, methods=['GET'])
    def getProfile(self, request, pk=None):
        profile = UserProfile.objects.all().filter(user=pk).values()[0]
        data = json.dumps(profile)
        return JsonResponse(data, safe=False)

    @action(detail=True, methods=['POST'], permission_classes=[AllowAny])
    def editProfile(self, request, pk=None):
        print(request.data)
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == "POST":
            role = request.data['role']
            adress = request.data['adress']
            email = request.data['email']
            phone = request.data['phone']
            gender = request.data['gender']
            b = UserProfile(user=user, adress=adress, email=email,
                            phone=phone, gender=gender, role=role, notifications='{"number":0}')
            b.save()
            return HttpResponse(status=201)

    @action(detail=True, methods=['POST'])
    def addToFavorits(self, request, pk=None):
        user = User.objects.get(id=pk)
        house = House.objects.get(id=request.data)

        if len(Favorits.objects.all().filter(user=user.id, house=house.id).values()) == 0:
            f = Favorits(user=user, house=house, status='favorit')
            f.save()
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)

    @action(detail=True, methods=['POST'])
    def removeFavorit(self, request, pk=None):
        user = User.objects.get(id=pk)
        house = House.objects.get(id=request.data)

        Favorits.objects.all().filter(user=user.id, house=house.id).delete()
        return HttpResponse(status=200)

    @action(detail=True, methods=['GET'])
    def getFavorits(self, request, pk=None):
        user = User.objects.get(id=pk)
        fav = [i['house_id'] for i in list(Favorits.objects.all().filter(
            user=user.id, status='favorit').values('house_id'))]
        favHouses = list(House.objects.all().filter(pk__in=fav).values())
        for i in favHouses:
            i['images'] = list(Image.objects.all().filter(
                house=i['id']).values('image', 'default'))

        res = [i['house_id'] for i in list(Favorits.objects.all().filter(
            user=user.id, status='pending').values('house_id'))]
        resHouses = list(House.objects.all().filter(pk__in=res).values())
        for i in resHouses:
            i['images'] = list(Image.objects.all().filter(
                house=i['id']).values('image', 'default'))

        house = [favHouses, resHouses]

        return JsonResponse(json.dumps(house), safe=False)

    @action(detail=True, methods=['POST'])
    def reserveHouse(self, request, pk=None):
        hid = request.data['hid']
        user = User.objects.get(id=pk)
        house = House.objects.get(id=hid)
        print(Favorits.objects.all().filter(user=pk, house=hid).values())
        if len(Favorits.objects.all().filter(user=pk, house=hid).values()) == 0:
            f = Favorits(user=user, house=house, status='pending',
                         nbplaces=request.data['nbplaces'])

        elif len(Favorits.objects.all().filter(user=pk, house=hid, status='pending').values()) == 0:
            f = Favorits.objects.get(user=pk, house=hid)
            f.status = 'pending'
            f.nbplaces = request.data['nbplaces']
        else:
            return HttpResponse(status=400)

        f.save()
        h = json.loads(house.registration)
        print(h)
        h['demanders'].append({
            'id': pk,
            'name': user.username,
            'nbplaces': request.data['nbplaces'],
        })
        house.registration = json.dumps(h)
        house.save()
        profile = UserProfile.objects.get(user=house.owner.id)
        notif = json.loads(profile.notifications)
        try:
            notif['reservations'].append({'uid': pk, 'hid': hid})
        except:
            # the first number in the list keeps track of the number of new notifcations
            notif['reservations'] = [{'uid': pk, 'hid': hid}]
        profile.notifications = json.dumps(notif)
        profile.save()
        return HttpResponse(status=200)

    @action(detail=True, methods=['POST'])
    def cancelReserve(self, request, pk=None):
        hid = request.data['hid']
        house = House.objects.get(id=hid)
        profile = UserProfile.objects.get(user=house.owner.id)

        notif = json.loads(profile.notifications)
        # [0, {'uid': '2', 'hid': 13}, {'uid': '2','hid': 15}, {'uid': '2', 'hid': 19}]
        for i in notif['reservations']:
            try:
                if i['uid'] == pk and i['hid'] == hid:
                    notif['reservations'].remove(i)
                    profile.notifications = json.dumps(notif)
                    profile.save()
                    break
            except:
                pass
        if len(Favorits.objects.all().filter(user=pk, house=hid, status='pending').values()) != 0:
            Favorits.objects.all().filter(user=pk, house=hid).delete()
            h = json.loads(house.registration)
            for i in h['demanders']:
                if i['id'] == pk:
                    h['demanders'].remove(i)
                    break
            house.registration = json.dumps(h)
            house.save()

            profile = UserProfile.objects.get(user=house.owner.id)
            notif = json.loads(profile.notifications)['reservations']

            return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)

    @action(detail=True, methods=['GET'])
    def getNotif(self, request, pk=None):
        profile = UserProfile.objects.all().filter(user=pk).values()[0]
        notif = json.loads(profile['notifications'])
        s = 0
        for i in notif.keys():
            if (i != 'number'):
                s += len(notif[i])
        if notif['number'] < s:
            notif['new'] = s - notif['number']
        else:
            notif['new'] = 0
        print(notif)
        return JsonResponse(json.dumps(notif), safe=False)

    @action(detail=True, methods=['POST'])
    def Vu(self, request, pk=None):
        profile = UserProfile.objects.get(user=pk)
        notif = json.loads(profile.notifications)
        print(notif)
        notif['number'] = notif['number'] + request.data['new']
        profile.notifications = json.dumps(notif)
        profile.save()

        s = 0
        for i in notif.keys():
            if (i != 'number'):
                s += len(notif[i])

        if notif['number'] < s:
            notif['new'] = s - notif['number']
        else:
            notif['new'] = 0
        print(notif)
        return JsonResponse(json.dumps(notif), safe=False)
