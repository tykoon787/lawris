from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Lawyer, Student, Judiciary, Business, NonLitigant, LawFirm, Institution

UserModel = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer to add custom claims like 'email' to the token.
    """
    @classmethod
    def get_token(cls, user):
        """
        Override the get_token method to add custom claims to the token.

        Args:
            user: The user for whom the token is generated.

        Returns:
            The JWT token with custom claims.
        """
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email
        return token

class LawyerSerializer(serializers.ModelSerializer):
    """
    Serializer for Lawyer registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Lawyer
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'license_number')

    def create(self, validated_data):
        """
        Create and save a new Lawyer instance with validated data.

        Args:
            validated_data: Validated data for creating a new Lawyer.

        Returns:
            The created Lawyer instance.
        """
        lawyer = Lawyer.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            license_number=validated_data['license_number']
        )
        lawyer.set_password(validated_data['password'])
        lawyer.save()
        return lawyer

class StudentSerializer(serializers.ModelSerializer):
    """
    Serializer for Student registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Student
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'student_id')

    def create(self, validated_data):
        """
        Create and save a new Student instance with validated data.

        Args:
            validated_data: Validated data for creating a new Student.

        Returns:
            The created Student instance.
        """
        student = Student.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            student_id=validated_data['student_id']
        )
        student.set_password(validated_data['password'])
        student.save()
        return student

class JudiciarySerializer(serializers.ModelSerializer):
    """
    Serializer for Judiciary registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Judiciary
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'employee_id')

    def create(self, validated_data):
        """
        Create and save a new Judiciary instance with validated data.

        Args:
            validated_data: Validated data for creating a new Judiciary.

        Returns:
            The created Judiciary instance.
        """
        judiciary = Judiciary.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            employee_id=validated_data['employee_id']
        )
        judiciary.set_password(validated_data['password'])
        judiciary.save()
        return judiciary

class BusinessSerializer(serializers.ModelSerializer):
    """
    Serializer for Business registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Business
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'registration_number')

    def create(self, validated_data):
        """
        Create and save a new Business instance with validated data.

        Args:
            validated_data: Validated data for creating a new Business.

        Returns:
            The created Business instance.
        """
        business = Business.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            registration_number=validated_data['registration_number']
        )
        business.set_password(validated_data['password'])
        business.save()
        return business

class Non_litigantSerializer(serializers.ModelSerializer):
    """
    Serializer for Non-Litigant registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = NonLitigant
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number')

    def create(self, validated_data):
        """
        Create and save a new Non-Litigant instance with validated data.

        Args:
            validated_data: Validated data for creating a new Non-Litigant.

        Returns:
            The created Non-Litigant instance.
        """
        non_litigant = NonLitigant.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )
        non_litigant.set_password(validated_data['password'])
        non_litigant.save()
        return non_litigant

class LawFirmSerializer(serializers.ModelSerializer):
    """
    Serializer for Law Firm registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = LawFirm
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number')

    def create(self, validated_data):
        """
        Create and save a new Law Firm instance with validated data.

        Args:
            validated_data: Validated data for creating a new Law Firm.

        Returns:
            The created Law Firm instance.
        """
        law_firm = LawFirm.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
        )
        law_firm.set_password(validated_data['password'])
        law_firm.save()
        return law_firm

class InstitutionSerializer(serializers.ModelSerializer):
    """
    Serializer for Institution registration and data validation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Institution
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number')

    def create(self, validated_data):
        """
        Create and save a new Institution instance with validated data.

        Args:
            validated_data: Validated data for creating a new Institution.

        Returns:
            The created Institution instance.
        """
        institution = Institution.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
        )
        institution.set_password(validated_data['password'])
        institution.save()
        return institution

