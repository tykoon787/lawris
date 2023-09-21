from django.shortcuts import render
from rest_framework import viewsets
from acct.models import Invoice
from acct.serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Invoices to be viewed or edited.
    """
    queryset = Invoice.objects.all().order_by('-created_at')
    serializer_class = InvoiceSerializer
    # permission_classes = [permissions.IsAuthenticated]