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
        
class ReplacementDataSerializer(serializers.Serializer):
    template_id = serializers.UUIDField()
    replacements = serializers.DictField()


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'