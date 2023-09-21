from rest_framework import serializers
from dms.models import CaseRuling, Document, DocumentTemplate


class CaseRulingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaseRuling
        fields = '__all__'

class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class DocumentTemplateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DocumentTemplate
        fields = '__all__'