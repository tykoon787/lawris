"""
In order for our models to be visible on the admin page, we need
to register them by opening the admin.py file (inside the app folder)
and use the following command to register the models.
"""

from django.contrib import admin
from . models import *

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Client)
admin.site.register(LawFirm)
admin.site.register(LegalCase)
admin.site.register(Document)
admin.site.register(Event)
admin.site.register(Task)
admin.site.register(CaseRuling)
admin.site.register(DocumentTemplate)
admin.site.register(ActivityLog)
admin.site.register(Invoice)