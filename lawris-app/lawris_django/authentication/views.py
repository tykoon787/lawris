from django.shortcuts import render
from django.http import JsonResponse
from firebase_admin import auth
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
from django.views.generic import View
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom token view for obtaining JWT tokens.

    Extends the TokenObtainPairView from rest_framework_simplejwt.
    This view includes the access and refresh tokens in the response.

    Attributes:
        serializer_class: The serializer class to use for token generation.

    Methods:
        post(request, *args, **kwargs): Handles the POST request to obtain tokens and customize the response.
    """
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to obtain JWT tokens and customize the response.

        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: JSON response containing access and refresh tokens.
        """

        id_token = request.data.get('id_token')
        if id_token:
            try:
                decoded_token = auth.verify_id_token(id_token)
                uid = decoded_token['uid']
                user = CustomUser.objects.get(uid=uid)
                refresh = RefreshToken.for_user(user)
                access = refresh.access_token
                return Response({
                    'refresh': str(refresh),
                    'access': str(access),
                })
            except auth.AuthError as e:
                return Response({'error': 'Firebase authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
            except CustomUser.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return super().post(request, *args, **kwargs)


class CustomRefreshTokenView(TokenRefreshView):
    """
    Custom token refresh view with additional actions.

    Extends the TokenRefreshView from rest_framework_simplejwt.
    Provides an option to perform additional actions after refreshing the token.

    Methods:
        post(request, *args, **kwargs): Handles the POST request to refresh tokens and allows custom actions.
    """
    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to refresh tokens and allows custom actions.

        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: JSON response indicating the success of token refresh or an error.
        """
        try:
            response = super().post(request, *args, **kwargs)
            # Additional actions after refreshing the token
            return response
        except Exception as e:
            return Response({"error": "Token refresh failed"}, status=status.HTTP_400_BAD_REQUEST)


class UnifiedRegisterView(APIView):
    """
    View for user registration.

    Allows registration of various user types, such as students, lawyers, etc.

    Attributes:
        permission_classes: A tuple of permissions, allowing any user to register.
        serializer_mapping: A dictionary mapping user types to their respective serializers.

    Methods:
        post(request, *args, **kwargs): Handles the POST request to register a user of a specified type.
    """
    permission_classes = (AllowAny,)
    serializer_mapping = {
        'student': StudentSerializer,
        'lawyer': LawyerSerializer,
        'judiciary': JudiciarySerializer,
        'business': BusinessSerializer,
        'nonlitigant': Non_litigantSerializer,
        'lawfirm': LawFirmSerializer,
        'institution': InstitutionSerializer,
    }

    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to register a user of a specified type.

        Args:
            request: The HTTP request object containing user registration data.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: JSON response indicating the success or failure of user registration.
        """
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
    """
    View for user logout.

    Allows users to log out by blacklisting the refresh token.

    Attributes:
        permission_classes: A tuple of permissions, allowing any user to log out.

    Methods:
        post(request): Handles the POST request to log out by blacklisting the refresh token.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        """
        Handle the POST request to log out by blacklisting the refresh token.

        Args:
            request: The HTTP request object containing the refresh token.

        Returns:
            Response: JSON response indicating the success or failure of the logout operation.
        """
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Successful Logout", status=status.HTTP_200_OK)
        except Exception as e:
            return Response("Logout Failed", status=status.HTTP_400_BAD_REQUEST)

class SignInWithGoogleView(View):
    template_name = 'signin_with_google.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class VerifyEmailView(APIView):
    def post(self, request):
        user_email = request.data.get('email')  # Get email from the request data

        # Check if the email exists in your user records
        user_exists = CustomUser.objects.filter(email=user_email).exists()

        if user_exists:
            return Response({'message': 'Email verified'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Email not found in records'}, status=status.HTTP_404_NOT_FOUND)

