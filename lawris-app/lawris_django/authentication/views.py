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

class UnifiedRegisterView(APIView):
    permission_classes = (AllowAny,)
    serializer_mapping = {
        'student': StudentSerializer,
        'lawyer': LawyerSerializer,
        'judiciary': JudiciarySerializer,
        'business': BusinessSerializer,
        'non_litigant': Non_litigantSerializer,
        'law_firm': LawFirmSerializer,
        'institution': InstitutionSerializer,
    }

    def post(self, request, *args, **kwargs):
        user_type = request.data.get('user_type')
        serializer_class = self.serializer_mapping.get(user_type)

        if not serializer_class:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"user_id": user.id, "user_type": user_type, 
                             "message": "User created successfully"}, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
