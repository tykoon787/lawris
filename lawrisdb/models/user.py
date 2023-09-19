from django.db import models
from lawrisdb.models.basemodel import BaseModel
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser, BaseModel):
    """
    custom user model extending BaseModel and Djangos AbstractUser
    """
    role = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # Specify custom related_names to avoid clashes ***** research further *****
    # custom_user_groups = models.ManyToManyField(Group, related_name='custom_users')
    # custom_user_permissions = models.ManyToManyField(Permission, related_name='custom_users')

    def __str__(self):
        return self.username

class ActivityLog(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField()