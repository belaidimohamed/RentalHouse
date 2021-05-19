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

import base64

from django.core.files.base import ContentFile


class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=True, methods=['POST'])
    def getHouse(self, request, pk=None):
        house = House.objects.all().filter(id=pk).values()[0]
        owner = User.objects.get(id=house['owner_id'])
        print(request.data)
        user = User.objects.get(id=request.data['uid'])
        if (len(Favorits.objects.all().filter(user=user.id, house=house['id'], status='favorit').values()) != 0):
            favorit = 'favorit'  # true if this house is favorit
        elif (len(Favorits.objects.all().filter(user=user.id, house=house['id'], status='pending').values()) != 0):
            favorit = 'pending'
        else:
            favorit = False
        images = list(Image.objects.all().filter(
            house=house['id']).values('image', 'default'))
        profile = UserProfile.objects.get(user=house['owner_id'])
        accepte = 0
        for i in json.loads(house['registration'])['accepted']:
            accepte += i['nbplaces']

        house['images'] = images
        house['accepted'] = accepte
        house.update({
            'owner_name':  owner.username,
            'email': profile.email,
            'phone': profile.phone,
            'favorit': favorit,
        })
        data = json.dumps(house)
        return JsonResponse(data, safe=False)

    @action(detail=False, methods=['GET'])
    def getHouses(self, request):
        houses = list(House.objects.all().values())

        for i in range(len(houses)):
            images = list(Image.objects.all().filter(
                house=houses[i]['id']).values('image', 'default'))
            houses[i]['images'] = images
        data = json.dumps(houses)
        return JsonResponse(data, safe=False)

    @action(detail=False, methods=['POST'])
    def getSpecificHouses(self, request):
        data = []
        for i in request.data :
            image = Image.objects.all().filter(house = i['hid']).values('image')[0]
            i.update({
                'house': House.objects.all().filter(id=i['hid']).values('size','price','location')[0],
                'demander' : User.objects.all().filter(id=i['uid']).values('username')[0]['username'] ,
                'nbplaces' : Favorits.objects.all().filter(user=i['uid'],house = i['hid']).values('nbplaces')[0]['nbplaces'],
                'image': image
            })
            data.append(i)

        print(data)
        return JsonResponse(json.dumps(data), safe=False)

    @action(detail=True, methods=['POST'], permission_classes=[AllowAny])
    def createHouse(self, request, pk=None, path=''):
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == "POST":
            size = request.data['type']
            description = request.data['description']
            location = request.data['location'].lower()
            price = request.data['price']
            max = request.data['max']
            b = House(owner=user, size=size, location=location, price=price, description=description,max = max,
                      registration='{"demanders":[],"accepted":[]}', comments="[]")
            b.save()
            for i in request.data['images']:

                format, imgstr = i['src'].split(';base64,')
                ext = format.split('/')[-1]
                data = ContentFile(base64.b64decode(
                    imgstr), name='temp.' + ext)

                img = Image(house=b, image=data)
                img.save()
            return HttpResponse({'id': b.id}, status=201)
        return HttpResponse({'error': 'Failed to create house'}, status=400)

    @action(detail=True, methods=['POST'])
    def deleteHouse(self, request, pk=None):
        # make sure the deleter is owner

        House.objects.all().filter(id=pk).delete()
        return HttpResponse(status=200)

# ----------------------------- Comment stuff ------------------------------------------------------------------------------------

    @action(detail=True, methods=['GET'])
    def getComments(self, request, pk=None):
        comments = House.objects.all().filter(
            id=pk).values('comments')[0]['comments']
        comments = json.loads(comments)
        for i in range(len(comments)):
            infos = User.objects.all().filter(
                id=comments[i]['user']).values('username')[0]
            comments[i].update(infos)
        data = json.dumps(comments)
        return JsonResponse(data, safe=False)

    @action(detail=True, methods=['POST'])
    def addComment(self, request, pk=None):
        house = House.objects.get(id=pk)
        print(house)
        comments = json.loads(house.comments)
        temp = {}
        temp['id'] = len(comments)
        for i in request.data:
            temp[i] = request.data[i]
        comments.append(temp)
        house.comments = json.dumps(comments)
        house.save()
        return HttpResponse(status=201)

    @action(detail=True, methods=['POST'])
    def Like(self, request, pk=None):
        house = House.objects.get(id=pk)
        comments = json.loads(house.comments)
        uid = int(request.data['userId'])
        cid = int(request.data['commentId'])
        print(comments[cid]['jaims'])
        if uid in set().union(*(d.values() for d in comments[cid]['jaims'])):
            comments[cid]['jaims'] = [
                i for i in comments[cid]['jaims'] if (i['id'] != uid)]
            house.comments = json.dumps(comments)
        else:
            x = {}
            name = User.objects.all().filter(
                id=uid).values('username')[0]['username']
            x['name'] = name
            x['id'] = uid
            x['type'] = 'thumb'
            comments[cid]['jaims'].append(x)
            house.comments = json.dumps(comments)
        house.save()
        return HttpResponse(status=200)

    @action(detail=True, methods=['POST'])
    def Reply(self, request, pk=None):
        house = House.objects.get(id=pk)
        comments = json.loads(house.comments)
        uid = int(request.data['userid'])
        cid = int(request.data['commentid'])
        time = request.data['time']
        reply = request.data['reply']
        x = {}
        name = User.objects.all().filter(
            id=uid).values('username')[0]['username']
        x['name'] = name
        x['id'] = uid
        x['time'] = time
        x['reply'] = reply
        x['reply_id'] = len(comments[cid]['reponses'])
        comments[cid]['reponses'].append(x)
        house.comments = json.dumps(comments)
        house.save()
        return HttpResponse(status=200)

    @action(detail=True, methods=['POST'])
    def deleteComment(self, request, pk=None):
        house = House.objects.get(id=pk)
        comments = json.loads(house.comments)
        uid = int(request.data['uid'])
        # self.check_object_permissions(request, user) TODO later check user for further security
        cid = int(request.data['cid'])
        del comments[cid]

        if (cid != len(comments)):
            # reseting Comments id so nothing get worst
            for i in range(cid, len(comments)):
                print("for", comments[i]['id'])
                comments[i]['id'] = i

        house.comments = json.dumps(comments)
        house.save()
        return HttpResponse(status=200)

    @action(detail=True, methods=['POST'])
    def deleteReply(self, request, pk=None):
        house = House.objects.get(id=pk)
        comments = json.loads(house.comments)
        uid = int(request.data['uid'])
        # self.check_object_permissions(request, user) TODO later check user for further security
        cid = int(request.data['cid'])
        rid = int(request.data['rid'])
        del comments[cid]['reponses'][rid]

        if (rid != len(comments[cid]['reponses'])):
            # reseting Comments id so nothing get worst
            for i in range(rid, len(comments[cid]['reponses'])):
                print("for", comments[cid]['reponses'][i]['reply_id'])
                comments[cid]['reponses'][i]['reply_id'] = i

        house.comments = json.dumps(comments)
        house.save()
        return HttpResponse(status=200)

# ----------------------------- Filtre stuff ------------------------------------------------------------------------------------

    @action(detail=False, methods=['POST'])
    def filtrer(self, request):
        print(request.data)

        if(request.data['location'] == None and request.data['type'] == 'Choose house type'):
            houses = list(House.objects.filter(
                price__gte=request.data['minValue'],
                price__lte=request.data['maxValue'],
            ).values())
        elif(request.data['type'] == 'Choose house type'):
            houses = list(House.objects.filter(
                location=request.data['location'].lower(),
                price__gte=request.data['minValue'],
                price__lte=request.data['maxValue'],
            ).values())
        elif(request.data['location'] == None):
            print('here')
            houses = list(House.objects.filter(
                size=request.data['type'],
                price__gte=request.data['minValue'],
                price__lte=request.data['maxValue'],
            ).values())
        else:
            houses = list(House.objects.filter(
                location=request.data['location'].lower(),
                size=request.data['type'],
                price__gte=request.data['minValue'],
                price__lte=request.data['maxValue'],
            ).values())

        print(houses)

        for i in range(len(houses)):
            images = list(Image.objects.all().filter(
                house=houses[i]['id']).values('image', 'default'))
            houses[i]['images'] = images
        data = json.dumps(houses)
        return JsonResponse(data, safe=False)

    @action(detail=True, methods=['Get'], permission_classes=[AllowAny])
    def auto(self, request, pk=None):
        user = User.objects.get(id=pk)
        f = open('media/auto/houses.json',)

        data = json.load(f)
        for i in data:
            print(i)
            size = i['size']
            description = i['description']
            location = i['location'].lower()
            price = i['price']
            max = i['max']
            b = House(owner=user, size=size, location=location, price=price, max=max,
                      description=description, registration='{"demanders":[],"accepted":[]}', comments="[]")
            b.save()
            img = Image(house=b, image="auto/" + i['path'])
            img.save()
        return HttpResponse(status=200)

# "comments": "[
#   { \"id\": 0, \"comment\": \"hello\\n\", \"user\": 1, \"jaims\": [], \"reponses\": [], \"time\": \"2021-05-02T09:47:53.879Z\"}
# , {\"id\": 1, \"comment\": \"why\", \"user\": 1, \"jaims\": [], \"reponses\": [], \"time\": \"2021-05-02T09:47:57.932Z\"}
#  , {\"id\": 2, \"comment\": \"fuck\", \"user\": 1, \"jaims\": [], \"reponses\": [], \"time\": \"2021-05-02T09:47:57.932Z\"}
# ]"
