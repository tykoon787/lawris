# from django.test import TestCase
# from dms.models import Template
import pdfplumber
import docx

file = "/home/tykoon787/projects/lawris/lawris-app/lawris_django/dms/templates/f_78.docx"

import docx

def replace_placeholder(doc, placeholder, replacement):
    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            print(f"[DEBUG]: Run: {run.text}")
            if placeholder in run.text:
                run.text = run.text.replace(placeholder, replacement)
            # else:
            #     print(f"[DEBUG]: Placeholder '{placeholder}' not Found")

def main():
    # Load the Word document
    doc = docx.Document(file)  # Replace with the path to your Word document
    
    # Define your replacements
    # replacements = {
    #     "{TITLE}": 'Petition for grant of probate',
    #     "{HEADING}": 'Heading',
    #     "{PETITIONER}": 'Kwame Nkuruma',
    #     "{PETITIONER_ADDRESS}": 'P.O Box 7396 Eldoret',
    #     "{DECEASED}": 'Saitoti Kanga',
    #     "{DATE_OF_DEATH}": 'January 1',
    #     "{YEAR_OF_DEATH}": '2023',
    #     "{STATE_OF_DEATH}": 'Nigeria',
    #     "{DOMICILED_AREA}": 'Nigeria',
    #     "{EXECTUROR(S)}": 'Executor 1',
    #     "{PETITIONER_SIGNATURE}": 'Kwame Nkuruma (Signature)',
    #     "{WITNESS}": 'Witness 1',
    #     "{WITNESS_SIGNATURE}": 'Chenge (Signature)',
    #     "{ADVOCATE_ADRESS}": '123 Main St, Nigeria',
    #     "{ADVOCATE_SIGNATURE}": 'Advocate (Signature)',
    #     "{ADDRESS_OF_SERVICE}": '456 Elm St, Nigeria',
    # }

    replacements = {
        'TITLE': 'Petition for grant of probate',
        'HEADING': 'Heading',
        'PETITIONER': 'Kwame Nkuruma',
        'PETITIONER_ADDRESS': 'P.O Box 7396 Eldoret',
        'DECEASED': 'Saitoti Kanga',
        'DATE_OF_DEATH': 'January 1',
        'YEAR_OF_DEATH': '2023',
        'STATE_OF_DEATH': 'Nigeria',
        'DOMICILED_AREA': 'Nigeria',
        'EXECTUROR(S)': 'Executor 1',
        'PETITIONER_SIGNATURE': 'Kwame Nkuruma (Signature)',
        'WITNESS': 'Witness 1',
        'WITNESS_SIGNATURE': 'Chenge (Signature)',
        'ADVOCATE_ADRESS': '123 Main St, Nigeria',
        'ADVOCATE_SIGNATURE': 'Advocate (Signature)',
        'ADDRESS_OF_SERVICE': '456 Elm St, Nigeria',
    }


    # Perform replacements
    for placeholder, replacement in replacements.items():
        replace_placeholder(doc, placeholder, replacement)
    
    # Save the modified document
    doc.save("Modifed_v5.docx")  # Replace with the desired output file path

if __name__ == "__main__":
    main()










# file = "/home/tykoon787/projects/lawris/lawris-app/lawris_django/dms/templates/form_78_v2.pdf"

# Create the template
# template = Template.objects.create(
#     type="petition",
#     title="Form 78",
#     category_of_law="civil",
#     division_of_law='family',
#     branch_of_division_of_law='succession',
#     template_file=file
# )

# # Retrieve the template
# template = Template.objects.get(title="Form 78")

# template_content = ""
# with pdfplumber.open(file) as pdf:
#     for page in pdf.pages:
#         page_text = page.extract_text()
#         template_content += page_text + "\n"

# data = {
#     'TITLE': 'Petition for grant of probate',
#     'HEADING': 'Heading',
#     'PETITIONER': 'Kwame Nkuruma',
#     'PETITIONER_ADDRESS': 'P.O Box 7396 Eldoret',
#     'DECEASED': 'Saitoti Kanga',
#     'DATE_OF_DEATH': 'January 1',
#     'YEAR_OF_DEATH': '2023',
#     'STATE_OF_DEATH': 'Nigeria',
#     'DOMICILED_AREA': 'Nigeria',
#     'EXECTUROR(S)': 'Executor 1',
#     'PETITIONER_SIGNATURE': 'Kwame Nkuruma (Signature)',
#     'WITNESS': 'Witness 1',
#     'WITNESS_SIGNATURE': 'Chenge (Signature)',
#     'ADVOCATE_ADRESS': '123 Main St, Nigeria',
#     'ADVOCATE_SIGNATURE': 'Advocate (Signature)',
#     'ADDRESS_OF_SERVICE': '456 Elm St, Nigeria',
# }

# filled_template = template.fill_template(data)

# filled_template = template_content.format(**data)

# with open('filled_template', 'w') as to_write:
#     to_write.write(filled_template)

