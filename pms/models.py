from django.db import models
from lawris.basemodel import BaseModel

class Client(BaseModel):
    name = models.CharField(max_length=100)
    contact_details = models.TextField(blank=True, null=True)
    case_history = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class LawFirm(BaseModel):
    name = models.CharField(max_length=100)
    contact_details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class LegalCase(BaseModel):
    case_number = models.CharField(max_length=50)
    case_type = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50)
    clients = models.ManyToManyField(Client, related_name='cases')  # Many-to-Many relationship with clients

    def __str__(self):
        return self.case_number

class Event(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title

class Task(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    priority = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title
