from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, full_name, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    confirm_password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20)
    is_staff = models.BooleanField(default=False)  # Add this line
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def get_by_natural_key(self, email_):
        return self.get(email=email_)

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff


class Lawyer(CustomUser):
    license_number = models.CharField(max_length=50)

class NonLitigant(CustomUser):
    # Add fields specific to the NonLitigant user type
    # ...
    pass

class Student(CustomUser):
    student_id = models.CharField(max_length=50)

class Judiciary(CustomUser):
    employee_id = models.CharField(max_length=50)

class LawFirm(CustomUser):
    pass

class Institution(CustomUser):
    # Add fields specific to the Institution user type
    # ...
    pass

class Business(CustomUser):
    registration_number = models.CharField(max_length=50)
