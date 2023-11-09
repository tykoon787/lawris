# from django.test import TestCase
from .models import Template
import pdfplumber
import docx

# file = "/home/tykoon787/projects/lawris/lawris-app/lawris_django/dms/templates/Form_78_refined.pdf"

# def replace_placeholder(doc, placeholder, replacement):
#     for paragraph in doc.paragraphs:
#         for run in paragraph.runs:
#             print(f"[DEBUG]: Run: {run.text}")
#             if placeholder in run.text:
#                 run.text = run.text.replace(placeholder, replacement)

# def read_file(file_path):
#     template_content = ""
#     with pdfplumber.open(file_path) as pdf_template:
#         for page in pdf_template.pages:
#             page_text = page.extract_text()
#             template_content += page_text + "\n"
#             return template_content


# def run():
#     # doc = docx.Document(file)

#     replacements = {
#         "{TITLE}": 'Petition for Grant of Probate',
#         "{HEADING}": 'In the High Court of {COURT_LOCATION}',
#         "{PETITIONER_NAME}": 'Kwame Nkuruma',
#         "{PETITIONER_ADDRESS_DESCRIPTION}": 'Residing at',
#         "{PETITIONER_ADDRESS}": '123 Main Street, Accra, Ghana',
#         "{DECEASED_NAME}": 'Ngozi Okafor',
#         "{DATE_OF_DECEASED_DEATH}": '15th September',
#         "{YEAR_OF_DECEASED_DEATH}": '2023',
#         "{PLACE_OF_DECEASED_DEATH}": 'Lagos, Nigeria',
#         "{DOMICILED_AREA}": 'Abuja, Nigeria',
#         "{EXECUTOR}": 'Chukwudi Eze',
#         "{PETITIONER_SIGNATURE}": 'K.N',
#         "{WITNESS}": 'Amina Ibrahim',
#         "{WITNESS_SIGNATURE}": 'A.I',
#         "{WITNESS_ADDRESS_DESCRIPTION}": 'Residing at',
#         "{WITNESS_ADDRESS}": '456 Park Avenue, Nairobi, Kenya',
#         "{ADDRESS_OF_SERVICE}": '789 Court Street, Cape Town, South Africa',
#         "{COURT_LOCATION}": 'Lagos, Nigeria' 
#     }

#     generated_content = read_file(file)
#     filled_template = generated_content.format(**replacements)
#     print(filled_template)

    # # Perform replacements
    # for placeholder, replacement in replacements.items():
    #     replace_placeholder(doc, placeholder, replacement)
    
    # # Save the modified document
    # doc.save("Modifed_v6.docx")  # Replace with the desired output file path



# def main():
#     # Load the Word document
#     doc = docx.Document(file)  # Replace with the path to your Word document
    
#     # Define your replacements
#     replacements = {
#         "{TITLE}": 'Petition for Grant of Probate',
#         "{HEADING}": 'In the High Court of {COURT_LOCATION}',
#         "{PETITIONER_NAME}": 'Kwame Nkuruma',
#         "{PETITIONER_ADDRESS_DESCRIPTION}": 'Residing at',
#         "{PETITIONER_ADDRESS}": '123 Main Street, Accra, Ghana',
#         "{DECEASED_NAME}": 'Ngozi Okafor',
#         "{DATE_OF_DECEASED_DEATH}": '15th September',
#         "{YEAR_OF_DECEASED_DEATH}": '2023',
#         "{PLACE_OF_DECEASED_DEATH}": 'Lagos, Nigeria',
#         "{DOMICILED_AREA}": 'Abuja, Nigeria',
#         "{EXECUTOR}": 'Chukwudi Eze',
#         "{PETITIONER_SIGNATURE}": "K.N",
#         "{WITNESS}": 'Amina Ibrahim',
#         "{WITNESS_SIGNATURE}": "A.I",
#         "{WITNESS_ADDRESS_DESCRIPTION}": 'Residing at',
#         "{WITNESS_ADDRESS}": '456 Park Avenue, Nairobi, Kenya',
#         "{ADDRESS_OF_SERVICE}": '789 Court Street, Cape Town, South Africa',
#         "{COURT_LOCATION}": 'Kisumu, Kenya'
# }

#     # Perform replacements
#     for placeholder, replacement in replacements.items():
#         replace_placeholder(doc, placeholder, replacement)
    
#     # Save the modified document
#     doc.save("Modifed_v6.docx")  # Replace with the desired output file path

# if __name__ == "__main__":
#     main()







file = "/home/tykoon787/projects/lawris/lawris-app/lawris_django/dms/templates/Form_78_refined_v2.docx"

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

replacements = {
    "TITLE": 'Petition for Grant of Probate',
    "HEADING": 'In the High Court of Nairobi, Kenya',
    "PETITIONER_NAME": 'Kwame Nkuruma',
    "PETITIONER_ADDRESS_DESCRIPTION": 'Residing at',
    "PETITIONER_ADDRESS": '123 Main Street, Nairobi, Kenya',
    "DECEASED_NAME": 'Ngozi Okafor',
    "DATE_OF_DECEASED_DEATH": '15th September',
    "YEAR_OF_DECEASED_DEATH": '2023',
    "PLACE_OF_DECEASED_DEATH": 'Lagos, Nigeria',
    "DOMICILED_AREA": 'Abuja, Nigeria',
    "EXECUTOR": 'Chukwudi Eze',
    "PETITIONER_SIGNATURE": 'K.N',
    "WITNESS_NAME": 'Amina Ibrahim',
    "WITNESS_SIGNATURE": 'A.I',
    "WITNESS_ADDRESS_DESCRIPTION": 'Residing at',
    "WITNESS_ADDRESS": '456 Park Avenue, Nairobi, Kenya',
    "ADDRESS_OF_SERVICE": '789 Court Street, Nairobi, Kenya',
    "COURT_LOCATION": 'Nairobi, Kenya'
}

# replacements = {
#     "{TITLE}": 'Petition for Grant of Probate',
#     "{HEADING}": 'In the High Court of {COURT_LOCATION}',
#     "{PETITIONER_NAME}": 'Kwame Nkuruma',
#     "{PETITIONER_ADDRESS_DESCRIPTION}": 'Residing at',
#     "{PETITIONER_ADDRESS}": '123 Main Street, Accra, Ghana',
#     "{DECEASED_NAME}": 'Ngozi Okafor',
#     "{DATE_OF_DECEASED_DEATH}": '15th September',
#     "{YEAR_OF_DECEASED_DEATH}": '2023',
#     "{PLACE_OF_DECEASED_DEATH}": 'Lagos, Nigeria',
#     "{DOMICILED_AREA}": 'Abuja, Nigeria',
#     "{EXECUTOR}": 'Chukwudi Eze',
#     "{PETITIONER_SIGNATURE}": 'K.N',
#     "{WITNESS}": 'Amina Ibrahim',
#     "{WITNESS_SIGNATURE}": 'A.I',
#     "{WITNESS_ADDRESS_DESCRIPTION}": 'Residing at',
#     "{WITNESS_ADDRESS}": '456 Park Avenue, Nairobi, Kenya',
#     "{ADDRESS_OF_SERVICE}": '789 Court Street, Cape Town, South Africa',
#     "{COURT_LOCATION}": 'Lagos, Nigeria' 
# }

# def replace_placeholder(doc, placeholder, replacement):
#     for paragraph in doc.paragraphs:
#         for run in paragraph.runs:
#             print(f"[DEBUG]: Run: {run.text}")
#             if placeholder in run.text:
#                 run.text = run.text.replace(placeholder, replacement)

# def run():
#     # form_78 = Template.create_template(**form_78_data)
#     doc = docx.Document(file)

#     # Perform replacements
#     for placeholder, replacement in replacements.items():
#         replace_placeholder(doc, placeholder, replacement)

#     # Save the modified document
#     doc.save("Modifed_v7.docx")  # Replace with the desired output file path


 

#     # doc = docx.Document(file)
#     # filled_document = form_78.fill_template(data=None, document=doc, replacements=replacements)
#     # print(filled_document)

# Added this comment just to test


def main():
    form_78 = Template.create_template(**form_78_data)
    doc = docx.Document(file)

    form_78_document = form_78.fill_template(data=None, document=doc, replacements=replacements)
    print(form_78_document)

def run():
    main()
