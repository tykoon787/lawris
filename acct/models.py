from django.db import models
from lawris.basemodel import BaseModel

class Invoice(BaseModel):
    # Define fields for invoices and payment records as needed
    client = models.TextField(blank=True, null=True)
    amount = models.CharField(max_length=100)