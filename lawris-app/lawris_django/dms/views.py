from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, mixins,  status
from rest_framework.views import APIView
from .models import Template, Document
from dms.serializers import TemplateSerializer,  ReplacementDataSerializer, DocumentSerializer
from django.shortcuts import render
import docx


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

class ReplacementDataView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ReplacementDataSerializer(data=request.data)

        if serializer.is_valid():
            template_id = serializer.validated_data['template_id']
            replacements = serializer.validated_data['replacements']

            try:
                template = Template.objects.get(id=template_id)
            except Template.DoesNotExist:
                return Response({'error': 'Template not found.'}, status=status.HTTP_404_NOT_FOUND)

            doc = docx.Document(template.template_file_docx)
            
            filled_template = template.fill_template(document=doc, replacements=replacements)

            return Response("200 OK")
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
