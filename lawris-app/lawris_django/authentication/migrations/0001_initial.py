# Generated by Django 4.2.6 on 2023-11-08 07:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('full_name', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('confirm_password', models.CharField(max_length=128)),
                ('phone_number', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
                ('registration_number', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='Judiciary',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
                ('employee_id', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='LawFirm',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
                ('registration_number', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='Lawyer',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
                ('license_number', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='NonLitigant',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.customuser')),
                ('student_id', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
            bases=('authentication.customuser',),
        ),
    ]
