# Generated by Django 4.2.6 on 2023-11-16 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_institution_iso_number_lawfirm_registration_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institution',
            name='ISO_number',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='lawfirm',
            name='registration_number',
            field=models.CharField(default='', max_length=50),
        ),
    ]
