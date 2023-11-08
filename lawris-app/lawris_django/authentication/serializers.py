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
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['email'] = user.email
        return token

class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawyer
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'license_number')

    def create(self, validated_data):
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
    class Meta:
        model = Student
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'student_id')

    def create(self, validated_data):
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
    class Meta:
        model = Judiciary
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'employee_id')

    def create(self, validated_data):
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
    class Meta:
        model = Business
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'registration_number')

    def create(self, validated_data):
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
    class Meta:
        model = NonLitigant
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number')

    def create(self, validated_data):
        non_litigant = NonLitigant.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )
        non_litigant.set_password(validated_data['password'])
        non_litigant.save()
        return non_litigant

class LawFirmSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawFirm
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'registration_number')

    def create(self, validated_data):
        law_firm = LawFirm.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            registration_number=validated_data['registration_number']
        )
        law_firm.set_password(validated_data['password'])
        law_firm.save()
        return law_firm

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ('full_name', 'email', 'password', 'confirm_password', 'phone_number', 'registration_number')

    def create(self, validated_data):
        institution = Institution.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            registration_number=validated_data['registration_number']
        )
        institution.set_password(validated_data['password'])
        institution.save()
        return institution
