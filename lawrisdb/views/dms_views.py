from django.shortcuts import render
from rest_framework import viewsets
from lawrisdb.serializers.dms_serializers import *

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

class CaseRulingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rulings to be viewed or edited.
    """
    queryset = CaseRuling.objects.all().order_by('-created_at')
    serializer_class = CaseRulingSerializer
    # permission_classes = [permissions.IsAuthenticated]