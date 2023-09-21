from rest_framework import serializers
from pms.models import Client, Event, LawFirm, LegalCase, Task

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
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