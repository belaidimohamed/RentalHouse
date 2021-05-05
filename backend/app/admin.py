from django.contrib import admin
from .models import *
from django.contrib.auth.models import User

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(House)
admin.site.register(Image)
admin.site.register(Favorits)
