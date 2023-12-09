from django.urls import path, include
from .views import TemplateListView, SingleTemplateView, PrintTemplateView, ReplacementDataView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'templates', TemplateListView)

urlpatterns = [
    path('app/', views.react_app, name="react_app"),
    path('api/', include(router.urls)),
    path('api/templates/<int:pk>/', SingleTemplateView.as_view({'get': 'retrieve'}), name='template-detail'),
    path('api/templates/print/', PrintTemplateView.as_view(), name='print-template'),
    path('replacement-data/', ReplacementDataView.as_view(), name='replacement-data')
]
