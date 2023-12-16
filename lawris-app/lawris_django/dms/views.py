from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, mixins,  status
from rest_framework.views import APIView
from .models import Template, Document
from dms.serializers import TemplateSerializer,  ReplacementDataSerializer, DocumentSerializer
from django.shortcuts import render
import docx
import os
import tempfile
from django.http import FileResponse


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

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()
    actions = {
        'get': 'retrieve',
    }

from django.http import HttpResponse
from io import BytesIO
import docx

def serve_document(self, request, document_object, document_format):
    """
    Serve a document object as either DOCX or PDF attachment.

    Args:
        request: The Django request object.
        document_object: The generated document object containing content.

    Returns:
        A Django HttpResponse object with attached document.
    """

    if document_format == "docx":
        try:
            # Convert raw content to DOCX document
            docx_obj = docx.Document(BytesIO(document_object.content))
        except Exception as conversion_error:
            print(f"Error converting raw content to DOCX: {conversion_error}")
            raise ValueError("Invalid DOCX content")

        # Create a BytesIO buffer to serve the DOCX content
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = f'attachment; filename="{document_object.title}.docx"'

        # Save the DOCX content to the buffer
        docx_obj.save(response)
        return response

    elif document_format == "pdf":
        pdf_content = document_object
        # Serve PDF directly from document object data
        content_type = 'application/pdf'

        # Create an HTTP response with the PDF content
        response = HttpResponse(pdf_content, content_type=content_type)
        response['Content-Disposition'] = f'attachment; filename="{document_object.title}"'

        return response


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

            file_extension = os.path.splitext(template.template_file_docx)[1].lower()

            try:
                if file_extension == '.pdf':
                    filled_document = template.fill_template(data=template.template_file_docx, replacements=replacements)
                    document_format = 'pdf' 
                elif file_extension == '.docx':
                    filled_document = template.fill_template(document=docx.Document(template.template_file_docx), replacements=replacements)
                    document_format = 'docx'
                else:
                    raise ValueError(f"Unsupported document format: {file_extension}")

                return serve_document(self, request, filled_document, document_format)


            except Exception as e:
                print(f"Error during document generation: {e}")

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)