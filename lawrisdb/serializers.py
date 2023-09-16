from rest_framework import serializers
from . models import CustomUser
from django.contrib.auth.models import Permission

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission