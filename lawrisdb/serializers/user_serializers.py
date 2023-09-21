from rest_framework import serializers
from lawrisdb.models.user import CustomUser, ActivityLog

from django.contrib.auth.models import Permission

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission


class ActivityLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ActivityLog
        fields = '__all__'