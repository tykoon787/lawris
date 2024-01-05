from django.urls import path
from .views import (
    MyTokenObtainPairView,
    LogoutView,
    CustomRefreshTokenView,
    UnifiedRegisterView,
    SignInWithGoogleView,
    VerifyEmailView,
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('register/', UnifiedRegisterView.as_view(), name='unified_register'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('google/', SignInWithGoogleView.as_view(), name='google_login'),
    path('verify_email/', VerifyEmailView.as_view(), name='verify_email'),  # Add the verify_email endpoint
]

