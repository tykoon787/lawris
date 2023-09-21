from rest_framework import serializers
from lawrisdb.models.acct import *

class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'