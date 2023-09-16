from django.shortcuts import render
from . models import *
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import serializers
from . serializers import *
from django.contrib.auth.models import Permission
# Create your views here.

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

class CaseRulingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rulings to be viewed or edited.
    """
    queryset = CaseRuling.objects.all().order_by('-created_at')
    serializer_class = CaseRulingSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Client.objects.all().order_by('-created_at')
    serializer_class = ClientSerializer
    # permission_classes = [permissions.IsAuthenticated]

class DocumentTemplateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows document templates to be viewed or edited.
    """
    queryset = DocumentTemplate.objects.all().order_by('-created_at')
    serializer_class = DocumentTemplateSerializer
    # permission_classes = [permissions.IsAuthenticated]

class DocumentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows documents to be viewed or edited.
    """
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows events to be viewed or edited.
    """
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated]

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Invoices to be viewed or edited.
    """
    queryset = Invoice.objects.all().order_by('-created_at')
    serializer_class = InvoiceSerializer
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

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]



class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = serializers.ModelSerializer