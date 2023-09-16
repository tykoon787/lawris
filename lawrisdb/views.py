from django.shortcuts import render
from . models import CustomUser
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import serializers
from . serializers import CustomUserSerializer
from django.contrib.auth.models import Permission
# Create your views here.

class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows customusers to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-created_at')
    serializer_class = CustomUserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = serializers.ModelSerializer