import uuid
from django.db import models
from django.utils import timezone

# Create your models here.

class BaseModel(models.Model):
    """
    base model with common fields
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True # this makes BaseModel and abstract model, so it wont create a database table for itself

    def save(self, *args, **kwargs):
        """
        override the save method to update the 'upadated_at' timestamp when saving an instance
        """

        self.updated_at = timezone.now()
        super(BaseModel, self).save(*args, **kwargs)