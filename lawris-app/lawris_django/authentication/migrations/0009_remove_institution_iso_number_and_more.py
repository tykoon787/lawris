# Generated by Django 4.2.6 on 2023-11-15 10:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_alter_institution_iso_number_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='institution',
            name='ISO_number',
        ),
        migrations.RemoveField(
            model_name='lawfirm',
            name='registration_number',
        ),
    ]
