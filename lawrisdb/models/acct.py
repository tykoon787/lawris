from django.db import models
from lawrisdb.models.basemodel import BaseModel

class Invoice(BaseModel):
    # Define fields for invoices and payment records as needed
    amount = models.CharField(max_length=100)