from django.core.management.base import BaseCommand
from dms.tests import main

class Command(BaseCommand):
    help = 'Run the test script'

    def handle(self, *args, **options):
        main()
