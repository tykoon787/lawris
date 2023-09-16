from rest_framework import serializers
from . models import *
from django.contrib.auth.models import Permission

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission


class ActivityLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ActivityLog
        fields = '__all__'


class CaseRulingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaseRuling
        fields = '__all__'


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class DocumentTemplateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DocumentTemplate
        fields = '__all__'


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'


class LawFirmSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LawFirm
        fields = '__all__'


class LegalCaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LegalCase
        fields = '__all__'

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'