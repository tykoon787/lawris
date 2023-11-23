from .models import Template


form_78_data = {
    'type': 'Petition',
    'title': 'Grant of probate',
    'category_of_law': 'civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_79_data = {
    'type': 'Affidavit of Service',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_80_data = {
    'type': 'Amended Plaint',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_80_data = {
    'type': 'Grant of Probate Intestate',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_81_data = {
    'type': 'Affidavit of Service',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_82_data = {
    'type': 'Plaint Fast Track',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_83_data = {
    'type': 'Amended Plaint',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_84_data = {
    'type': 'Amended Plaint',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_85_data = {
    'type': 'Grant of Probate Intestate',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_86_data = {
    'type': 'Amended Plaint',
    'title': 'Grant of probate',
    'category_of_law': 'Crimial',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_87_data = {
    'type': 'Grant of Probate Intestate',
    'title': 'Grant of probate',
    'category_of_law': 'Civil',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_88_data = {
    'type': 'Plaint Fast Track',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

form_89_data = {
    'type': 'Amended Plaint',
    'title': 'Grant of probate',
    'category_of_law': 'Criminal',
    'division_of_law': 'family',
    'sub_division': 'succession',
    'template_file_docx': file,
    'pdf_preview_file' : "/mnt/preview",
    'form_fields' : {
        'field1': 'Field 1',
        'field2': 'Field 2',
    }
}

def main():
    form_78 = Template.create_template(**form_78_data)
    form_79 = Template.create_template(**form_79_data)
    form_80 = Template.create_template(**form_80_data)
    form_81 = Template.create_template(**form_81_data)
    form_82 = Template.create_template(**form_82_data)
    form_83 = Template.create_template(**form_83_data)
    form_84 = Template.create_template(**form_84_data)
    form_85 = Template.create_template(**form_85_data)
    form_86 = Template.create_template(**form_86_data)
    form_87 = Template.create_template(**form_87_data)
    form_88 = Template.create_template(**form_88_data)
    form_89 = Template.create_template(**form_89_data)
def run():
    main()
