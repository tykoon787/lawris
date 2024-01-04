from rest_framework import status
from rest_framework.response import Response
from .models import (
    Client, Contact, Matter, Task, CalendarEvent,
    TimeEntry, Expense, Invoice, Statute, Case,
    FinancialTransaction
)
from .serializers import (
    ClientSerializer, ContactSerializer, MatterSerializer,
    TaskSerializer, CalendarEventSerializer, TimeEntrySerializer,
    ExpenseSerializer, InvoiceSerializer, StatuteSerializer,
    CaseSerializer, FinancialTransactionSerializer
)
from rest_framework.views import APIView

# Base class for CRUD operations using APIView
class CRUDAPIView(APIView):
    model = None
    serializer_class = None

    def get_object(self, pk):
        try:
            return self.model.objects.get(pk=pk)
        except self.model.DoesNotExist:
            return None

    def get(self, request, pk=None):
        if pk:
            instance = self.get_object(pk)
            if not instance:
                return Response({"error": f"{self.model.__name__} not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(instance)
            return Response(serializer.data)
        else:
            queryset = self.model.objects.all()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        instance = self.get_object(pk)
        if not instance:
            return Response({"error": f"{self.model.__name__} not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = self.get_object(pk)
        if not instance:
            return Response({"error": f"{self.model.__name__} not found"}, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# CRUD views for each model
class ClientAPIView(CRUDAPIView):
    model = Client
    serializer_class = ClientSerializer

class ContactAPIView(CRUDAPIView):
    model = Contact
    serializer_class = ContactSerializer

class MatterAPIView(CRUDAPIView):
    model = Matter
    serializer_class = MatterSerializer

class TaskAPIView(CRUDAPIView):
    model = Task
    serializer_class = TaskSerializer

class CalendarEventAPIView(CRUDAPIView):
    model = CalendarEvent
    serializer_class = CalendarEventSerializer

class TimeEntryAPIView(CRUDAPIView):
    model = TimeEntry
    serializer_class = TimeEntrySerializer

class ExpenseAPIView(CRUDAPIView):
    model = Expense
    serializer_class = ExpenseSerializer

class InvoiceAPIView(CRUDAPIView):
    model = Invoice
    serializer_class = InvoiceSerializer

class StatuteAPIView(CRUDAPIView):
    model = Statute
    serializer_class = StatuteSerializer

class CaseAPIView(CRUDAPIView):
    model = Case
    serializer_class = CaseSerializer

class FinancialTransactionAPIView(CRUDAPIView):
    model = FinancialTransaction
    serializer_class = FinancialTransactionSerializer


