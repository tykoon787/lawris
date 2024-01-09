from rest_framework import serializers
from .models import (
    Client, Contact, Matter, Task, CalendarEvent,
    TimeEntry, Expense, Invoice, Statute, Case,
    FinancialTransaction
)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class MatterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matter
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = '__all__'

class TimeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeEntry
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

class StatuteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statute
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = '__all__'

class FinancialTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialTransaction
        fields = '__all__'

