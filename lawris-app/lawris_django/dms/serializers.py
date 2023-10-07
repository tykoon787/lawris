from rest_framework import serializers
from .models import Template, Document

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'

class CreateDocument(serializers.ModelSerializer):
    """
    Cretes a document from a template
    """
    class Meta:
        model = Template
        fields = '_all__'