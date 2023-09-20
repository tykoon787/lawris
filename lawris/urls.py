"""
URL configuration for lawris project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from dms.views import *
from pms.views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'caserulings', CaseRulingViewSet)
router.register(r'templates', DocumentTemplateViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'events', EventViewSet)
router.register(r'lawfirms', LawFirmViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'clients', ClientViewSet)
# router.register(r'invoices', InvoiceViewSet)
# router.register(r'users', CustomUserViewSet)
# router.register(r'permission', PermissionViewSet)
# router.register(r'activity-log', ActivityLogViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(router.urls))
]
