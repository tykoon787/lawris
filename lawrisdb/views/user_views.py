from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import serializers
from lawrisdb.serializers.user_serializers import *
from django.contrib.auth.models import Permission

class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows customusers to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-created_at')
    serializer_class = CustomUserSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ActivityLogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows activity logs to be viewed or edited.
    """
    queryset = ActivityLog.objects.all().order_by('-created_at')
    serializer_class = ActivityLogSerializer
    # permission_classes = [permissions.IsAuthenticated]

class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = serializers.ModelSerializer