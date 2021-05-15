from django.urls import path, include
from rest_framework import routers
from .views import ProfileView as p, HouseView as h
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register('users', p.UserViewSet)
router.register('profile', p.ProfileViewSet)
router.register('house', h.HouseViewSet)  # /fonctions (e.g /edithouse ..ect)


urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', p.CustomAuthToken.as_view()),
]
