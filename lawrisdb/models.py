import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
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



# 2. Client
class Client(BaseModel):
    name = models.CharField(max_length=100)
    contact_details = models.TextField(blank=True, null=True)
    case_history = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# 3. Law Firm
class LawFirm(BaseModel):
    name = models.CharField(max_length=100)
    lawyers = models.ManyToManyField(CustomUser, related_name='law_firms')  # Many-to-Many relationship with lawyers

    def __str__(self):
        return self.name

# 4. Case
class LegalCase(BaseModel):
    case_number = models.CharField(max_length=50)
    case_type = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50)
    clients = models.ManyToManyField(Client, related_name='cases')  # Many-to-Many relationship with clients
    lawyers = models.ManyToManyField(CustomUser, related_name='cases')  # Many-to-Many relationship with lawyers

    def __str__(self):
        return self.case_number

# 5. Document
class Document(BaseModel):
    document_type = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()
    case = models.ForeignKey(LegalCase, on_delete=models.CASCADE, related_name='documents', blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='documents', blank=True, null=True)

    def __str__(self):
        return self.title

# 6. Event/Calendar
class Event(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True, null=True)
    attendees = models.ManyToManyField(CustomUser, related_name='events')  # Many-to-Many relationship with users

    def __str__(self):
        return self.title

# 7. Task/To-Do
class Task(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    priority = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title

# 8. Case Rulings/Precedents
class CaseRuling(BaseModel):
    case_number = models.CharField(max_length=50)
    court = models.CharField(max_length=100)
    judges = models.TextField()
    parties_involved = models.TextField()
    legal_implications = models.TextField()

    def __str__(self):
        return self.case_number

# 10. Document Templates
class DocumentTemplate(BaseModel):
    template_type = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()

# 13. Notifications/Activity Feed
class ActivityLog(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

# 14. Billing/Invoices
class Invoice(BaseModel):
    # Define fields for invoices and payment records as needed
    amount = models.CharField(max_length=100)
