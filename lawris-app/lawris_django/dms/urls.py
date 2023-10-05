from django.urls import path, include
from .views import TemplateListView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'templates', TemplateListView)

urlpatterns = [
    path('app/', views.react_app, name="react_app"),
    path('api/', include(router.urls))
]
