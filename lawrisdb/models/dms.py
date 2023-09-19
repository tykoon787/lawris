from django.db import models
from lawrisdb.models.basemodel import BaseModel

class Document(BaseModel):
    document_type = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.title

class DocumentTemplate(BaseModel):
    template_type = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()


class CaseRuling(BaseModel):
    case_number = models.CharField(max_length=50)
    court = models.CharField(max_length=100)
    judges = models.TextField()
    parties_involved = models.TextField()
    legal_implications = models.TextField()

    def __str__(self):
        return self.case_number