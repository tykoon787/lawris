from django.contrib import admin
from django.urls import path, include
from dms import views

urlpatterns = [
    path('', views.react_app, name="react_app"),
    path('dms/', include('dms.urls')),
    path('pms/', include('pms.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
]
