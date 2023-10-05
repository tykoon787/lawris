from rest_framework import serializers
from .models import Template, Document

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'