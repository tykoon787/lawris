import uuid
from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    """
    Base Model for all models
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """
        Override the save method to update the 'updated_at' timestamp when saving an instance
        """
        self.updated_at = timezone.now()
        super(BaseModel, self).save(*args, **kwargs)

class Client(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()

class Contact(BaseModel):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

class Matter(BaseModel):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()

class Task(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()

class CalendarEvent(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

class TimeEntry(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    description = models.TextField()
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField()

class Expense(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

class Invoice(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    issued_date = models.DateField()
    due_date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

class Statute(BaseModel):
    code = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    description = models.TextField()

class Case(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    court_name = models.CharField(max_length=255)
    case_number = models.CharField(max_length=50)
    filing_date = models.DateField()
    case_status = models.CharField(max_length=50)
    description = models.TextField()

class FinancialTransaction(BaseModel):
    matter = models.ForeignKey(Matter, on_delete=models.CASCADE)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
 