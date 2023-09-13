from django.db import models

# Create your models here.


class Document(models.Model):
    """
    Document Model
    """
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000)
    type = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
