from django.urls import path
from .views import (
    MyTokenObtainPairView,
    LawyerRegisterView,
    StudentRegisterView,
    JudiciaryRegisterView,
    BusinessRegisterView,
    NonLitigantRegisterView,
    LawFirmRegisterView,
    InstitutionRegisterView,
    LogoutView,
    CustomRefreshTokenView,
)


urlpatterns = [
    path('login/refresh', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/lawyer/', LawyerRegisterView.as_view(), name='lawyer_register'),
    path('register/student/', StudentRegisterView.as_view(), name='student_register'),
    path('register/judiciary/', JudiciaryRegisterView.as_view(), name='judiciary_register'),
    path('register/business/', BusinessRegisterView.as_view(), name='business_register'),
    path('register/non_litigant/', NonLitigantRegisterView.as_view(), name='non_litigant_register'),
    path('register/law_firm/', LawFirmRegisterView.as_view(), name='law_firm_register'),
    path('register/institution/', InstitutionRegisterView.as_view(), name='institution_register'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]

