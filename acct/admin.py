"""
In order for our models to be visible on the admin page, we need
to register them by opening the admin.py file (inside the app folder)
and use the following command to register the models.
"""

from django.contrib import admin
from acct.models import Invoice



# Register your models here.

admin.site.register(Invoice)