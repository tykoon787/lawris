from django.contrib import admin
from .models import Lawyer, Student, Judiciary, Business, NonLitigant, LawFirm, Institution

class LawyerAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number', 'license_number')
    list_filter = ('full_name', 'license_number')

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number', 'student_id')
    list_filter = ('full_name', 'student_id')

class JudiciaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number', 'employee_id')
    list_filter = ('full_name', 'employee_id')

class BusinessAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number', 'registration_number')
    list_filter = ('full_name', 'registration_number')

class NonLitigantAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number')
    list_filter = ('full_name',)

class LawFirmAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number')
    list_filter = ('full_name',)

class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone_number')
    list_filter = ('full_name',)

admin.site.register(Lawyer, LawyerAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Judiciary, JudiciaryAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(NonLitigant, NonLitigantAdmin)
admin.site.register(LawFirm, LawFirmAdmin)
admin.site.register(Institution, InstitutionAdmin)
