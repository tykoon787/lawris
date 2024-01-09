# pms/urls.py
from django.urls import path
from .views import (
    ClientAPIView, ContactAPIView, MatterAPIView, TaskAPIView,
    CalendarEventAPIView, TimeEntryAPIView, ExpenseAPIView,
    InvoiceAPIView, StatuteAPIView, CaseAPIView,
    FinancialTransactionAPIView
)

urlpatterns = [
    path('clients/', ClientAPIView.as_view(), name='client-list'),
    path('clients/<uuid:pk>/', ClientAPIView.as_view(), name='client-detail'),

    path('contacts/', ContactAPIView.as_view(), name='contact-list'),
    path('contacts/<uuid:pk>/', ContactAPIView.as_view(), name='contact-detail'),

    path('matters/', MatterAPIView.as_view(), name='matter-list'),
    path('matters/<uuid:pk>/', MatterAPIView.as_view(), name='matter-detail'),

    path('tasks/', TaskAPIView.as_view(), name='task-list'),
    path('tasks/<uuid:pk>/', TaskAPIView.as_view(), name='task-detail'),

    path('calendar-events/', CalendarEventAPIView.as_view(), name='calendar-event-list'),
    path('calendar-events/<uuid:pk>/', CalendarEventAPIView.as_view(), name='calendar-event-detail'),

    path('time-entries/', TimeEntryAPIView.as_view(), name='time-entry-list'),
    path('time-entries/<uuid:pk>/', TimeEntryAPIView.as_view(), name='time-entry-detail'),

    path('expenses/', ExpenseAPIView.as_view(), name='expense-list'),
    path('expenses/<uuid:pk>/', ExpenseAPIView.as_view(), name='expense-detail'),

    path('invoices/', InvoiceAPIView.as_view(), name='invoice-list'),
    path('invoices/<uuid:pk>/', InvoiceAPIView.as_view(), name='invoice-detail'),

    path('statutes/', StatuteAPIView.as_view(), name='statute-list'),
    path('statutes/<uuid:pk>/', StatuteAPIView.as_view(), name='statute-detail'),

    path('cases/', CaseAPIView.as_view(), name='case-list'),
    path('cases/<uuid:pk>/', CaseAPIView.as_view(), name='case-detail'),

  
    path('financial-transactions/', FinancialTransactionAPIView.as_view(), name='financial-transaction-list'),
    path('financial-transactions/<uuid:pk>/', FinancialTransactionAPIView.as_view(), name='financial-transaction-detail'),

    
]
