from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    """
    Custom user manager for the CustomUser model.
    """

    def create_user(self, email, full_name, password=None, **extra_fields):
        """
        Create a new user with the given email and full name.

        Args:
            email (str): The user's email address.
            full_name (str): The user's full name.
            password (str): The user's password.
            extra_fields: Additional fields to save in the user model.

        Returns:
            CustomUser: The created user instance.

        Raises:
            ValueError: If email is not provided.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        """
        Create a new superuser with the given email and full name.

        Args:
            email (str): The superuser's email address.
            full_name (str): The superuser's full name.
            password (str): The superuser's password.
            extra_fields: Additional fields to save in the superuser model.

        Returns:
            CustomUser: The created superuser instance.

        Raises:
            ValueError: If is_staff or is_superuser is not set to True.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, full_name, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    """
    Custom user model with fields for full name, email, password, confirm_password,
    phone number, is_staff, and is_superuser.
    """

    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    confirm_password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def get_by_natural_key(self, email_):
        """
        Retrieve a user's unique identifier by their email.

        Args:
            email_: The user's email address.

        Returns:
            The user instance associated with the provided email.
        """
        return self.get(email=email_)

    def __str__(self):
        """
        Return a string representation of the user.

        Returns:
            The user's email as a string.
        """
        return self.email

    def has_perm(self, perm, obj=None):
        """
        Check if the user has the specified permission.

        Args:
            perm: The permission to check.
            obj: The object on which the permission is checked (default is None).

        Returns:
            True if the user has the specified permission, otherwise False.
        """
        return self.is_staff

    def has_module_perms(self, app_label):
        """
        Check if the user has permissions to view the specified app.

        Args:
            app_label: The label of the app for which permissions are checked.

        Returns:
            True if the user has permissions for the app, otherwise False.
        """
        return self.is_staff

class Lawyer(CustomUser):
    """
    Subclass of CustomUser representing users with a license number.
    """

    license_number = models.CharField(max_length=50)

class NonLitigant(CustomUser):
    """
    Subclass of CustomUser for non-litigant users.
    """
    pass

class Student(CustomUser):
    """
    Subclass of CustomUser representing student users with a student ID.
    """

    student_id = models.CharField(max_length=50)

class Judiciary(CustomUser):
    """
    Subclass of CustomUser representing judiciary users with an employee ID.
    """

    employee_id = models.CharField(max_length=50)

class LawFirm(CustomUser):
    """
    Subclass of CustomUser for generic users within law firms.
    """
    registration_number = models.CharField(max_length=50, default="")

class Institution(CustomUser):
    """
    Subclass of CustomUser for institution users.
    """

    ISO_number = models.CharField(max_length=50, default="")

class Business(CustomUser):
    """
    Subclass of CustomUser representing business users with a registration number.
    """

    registration_number = models.CharField(max_length=50)
