from django.contrib import admin
from django.urls import path, include
from dms import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.react_app, name="react_app"),
    path('dms/', include('dms.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),  # Include your authentication app's URLs
]
