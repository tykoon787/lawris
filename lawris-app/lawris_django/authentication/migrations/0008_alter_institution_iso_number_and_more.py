# Generated by Django 4.2.6 on 2023-11-15 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_alter_institution_iso_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institution',
            name='ISO_number',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='lawfirm',
            name='registration_number',
            field=models.CharField(max_length=50),
        ),
    ]
