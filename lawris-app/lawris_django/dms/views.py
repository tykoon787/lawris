from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, mixins
from rest_framework.views import APIView
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

class SingleTemplateView(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    """
    Return data for a single template
    """
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

class PrintTemplateView(APIView):
    """
    Returns to the client the filled document
    """
    def post(self, request):
        """
        Create method for handing the request
        """ 
        request_data = request.data
        print(f"Request Data Received: {request_data}")



class TemplateEditView(viewsets.ModelViewSet):
    """
    Editting template
    """
    pass
