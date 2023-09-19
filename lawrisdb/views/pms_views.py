from django.shortcuts import render
from rest_framework import viewsets
from lawrisdb.serializers.pms_serializers import *

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Client.objects.all().order_by('-created_at')
    serializer_class = ClientSerializer
    # permission_classes = [permissions.IsAuthenticated]

class LawFirmViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows customusers to be viewed or edited.
    """
    queryset = LawFirm.objects.all().order_by('-created_at')
    serializer_class = LawFirmSerializer
    # permission_classes = [permissions.IsAuthenticated]

class LegalCaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows legal cases to be viewed or edited.
    """
    queryset = LegalCase.objects.all().order_by('-created_at')
    serializer_class = LegalCaseSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows events to be viewed or edited.
    """
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]