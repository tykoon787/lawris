import logging
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    MyTokenObtainPairSerializer,
    LawyerSerializer,
    StudentSerializer,
    JudiciarySerializer,
    BusinessSerializer,
    Non_litigantSerializer,
    LawFirmSerializer,
    InstitutionSerializer,
)
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

logger = logging.getLogger(__name__)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        refresh_token = serializer.validated_data["refresh"]
        access_token = serializer.validated_data["access"]
        response = {
            "access": str(access_token),
            "refresh": str(refresh_token),
        }
        return Response(response)

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            # Additional actions after refreshing the token
            return response
        except Exception as e:
            return Response({"error": "Token refresh failed"}, status=status.HTTP_400_BAD_REQUEST)


class LawyerRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LawyerSerializer

class StudentRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = StudentSerializer

class JudiciaryRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = JudiciarySerializer

class BusinessRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BusinessSerializer

class NonLitigantRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = Non_litigantSerializer

class LawFirmRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LawFirmSerializer

class InstitutionRegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = InstitutionSerializer

class LogoutView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Successful Logout", status=status.HTTP_200_OK)
        except Exception as e:
            return Response("Logout Failed", status=status.HTTP_400_BAD_REQUEST)
