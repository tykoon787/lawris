# This file is used to create test templates
from .models import Template

# NOTE: Replace this with the template_file_docx. This is only a placeholder
file = "test/path"

form_78_data = {
    'type': 'Petition',
    'title': 'Grant of Probate 1',
    'category_of_law': 'civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_79_data = {
    'type': 'Affidavit',
    'title': 'Affidavit of Service',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_80_data = {
    'type': 'Petition',
    'title': 'Amended Plaint',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_80_data = {
    'type': 'Petition',
    'title': 'Grant of probate Intestate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_81_data = {
    'type': 'Affidavit',
    'title': 'Affidavit of Service 2',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_82_data = {
    'type': 'Petition',
    'title': 'Grant of probate for Administrtor',
    'category_of_law': 'Civil',
    'division_of_law': 'land',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_83_data = {
    'type': 'Affidavit',
    'title': 'Affidavit of service 3',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_84_data = {
    'type': 'petition',
    'title': 'Grant of probate 4',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_85_data = {
    'type': 'Petition',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_86_data = {
    'type': 'Affidavit',
    'title': 'Grant of probate',
    'category_of_law': 'Crimial',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_87_data = {
    'type': 'Petition',
    'title': 'Grant of probate Intestate 3',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_88_data = {
    'type': 'petition',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_89_data = {
    'type': 'Affidavit',
    'title': 'Grant of probate as an Affidavit',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file': "/mnt/preview",
    'form_fields': {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}


def template_creater(template_data: dict):
    """
    This method handles the creation of the template by calling
    the `create_template` from the `Template` Model
    """
    created_template = Template.create_template(**template_data)
    print(f"Created {created_template} Template")
    return created_template


def main():

    Templates = [
        form_78_data, form_79_data, form_80_data, form_81_data, form_82_data,
        form_83_data, form_84_data, form_85_data, form_86_data, form_87_data,
        form_88_data, form_89_data
    ]
    for template_data in Templates:
        template_creater(template_data)

    print(f"Finished Creating {len(Templates)} Templates")


def run():
    main()
