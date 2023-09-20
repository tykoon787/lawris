"""
In order for our models to be visible on the admin page, we need
to register them by opening the admin.py file (inside the app folder)
and use the following command to register the models.
"""

from django.contrib import admin
from dms.models import Document, DocumentTemplate, CaseRuling


# Register your models here.

admin.site.register(Document)
admin.site.register(CaseRuling)
admin.site.register(DocumentTemplate)
