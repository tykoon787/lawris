from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Template, Document
from dms.serializers import TemplateSerializer
from django.shortcuts import render


def react_app(request):
    return render(request, 'index.html')


class TemplateListView(viewsets.ModelViewSet):
    """
    List all templates
    """
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


class TemplateEditView(viewsets.ModelViewSet):
    """
    Editting template
    """
    pass
