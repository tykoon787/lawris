#!/usr/bin/env python3
"""
Script to create template files in the database
"""

from dms.models import Template
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import os
import logging
import shutil
from pathlib import Path

# Logs
log_dir = "/lawris/logs"

os.makedirs(log_dir, exist_ok=True)
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
log_file = os.path.join(log_dir, "create_templates.log")
file_handler = logging.FileHandler(log_file, mode="a")
file_handler.setLevel(logging.DEBUG)
file_formatter = logging.Formatter('[%(asctime)s] [%(levelname)-5s]  ::    %(message)s')
file_handler.setFormatter(file_formatter)
logger.addHandler(file_handler)

# Folders from cloud storage
lawris_db = "/home/kibe/Documents/lawris/lawris_db/"
template_folder = os.path.join(lawris_db, "templates") 
succession_docx_folder = os.path.join(template_folder, "succession")
succession_pdf_folder = os.path.join(template_folder, "SUCCESSION_FORMS")
thumbnail_folder = os.path.join(template_folder, "thumbnails")

class FormField():
    """
    Defines a form field
    """
    def __init__(self, name, type, placeholder):
        self.name = name,
        self.type = type,
        self.placeholder = placeholder

    def to_json(self):
        """
        Converts form field to json
        """
        return {
            "name" : self.name,
            "type" : self.type,
            "placeholder" : self.placeholder
        }

def get_thumbnail(thumbnail_path: str):
    """
    Retrieves the thumbnail img
    """
    # NOTE: This method leads to a Suspicious File Operation Error
    # image_temp_file = NamedTemporaryFile(delete=True)

    # in_memory_image = open(thumbnail_path, 'rb')

    # for block in in_memory_image.read(1024 * 8):
    #     if not block:
    #         break

    #     image_temp_file.write(block)

    # file_name = thumbnail_path.split('/')[-1]
    # image_temp_file.flush()
    # temp_file = File(image_temp_file, name=file_name)
    # return temp_file
    try:
        # Create a temporary file to work with
        with NamedTemporaryFile(delete=False) as temp_file:
            with open(thumbnail_path, 'rb') as image_file:
                logging.info(f"Copying the contents of the {thumbnail_path.split('/')[-1]} the temporary file")
                shutil.copyfileobj(image_file, temp_file)
                
        # Open the temporary file for reading
        with open(temp_file.name, 'rb') as temp_image_file:
            thumbnail_image = File(temp_image_file, name=thumbnail_path.split('/')[-1])
            logging.info(f"Done getting: {thumbnail_path.split('/')[-1]}")

            return thumbnail_image
    except FileNotFoundError as e:
        logging.error(e)
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
    finally:
        # Clean up the temporary file
        os.unlink(temp_file.name)

templates = {
    "form_78_template" : {
        'type': 'Petition',
        'title': 'Petition for probate of written will or for proof of oral will',
        'category_of_law': 'Civil',
        'division_of_law': 'Family',
        'sub_division': 'Succession',
        'template_file_docx': f'{succession_docx_folder}/Form_78.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 78-PETITION FOR PROBATE OF WRITTEN WILL OR FOR PROOF OF ORAL WILL_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("PETITIONER_NAME", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Petitioner's Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'executor' : FormField('EXECUTOR', 'text', "Enter Executor's Name").to_json(),
            'petitioner_signature': FormField('petitioner signature', 'file', 'Enter Petitioner Signature').to_json(),
            "witness_name" : FormField("WITNESS_NAME", "text", "Enter Witness Name").to_json(),
            "witness_signature": FormField("witness signature", "file", "Sign here").to_json(),
            "witness_address_description": FormField("WITNESS_ADDRESS_DESCRIPTION", "text", "Where do you stay?").to_json(),
            "witness_address" : FormField("Witness Address", "text", "P.O Box, 1244").to_json(),
            "address_of_service" : FormField("ADDRESS_OF_SERVICE", "text", "Enter Add of service").to_json()
        }
    },

    "form_80_template" : {
        'type': "Petition",
        'title': "Petition for letters of Administration Intestate",
        'category_of_law' : 'Civil',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_81_template" : {
        'type': "Plaint",
        'title': "Plaint (Fast Track)",
        'category_of_law' : 'Criminal',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_82_template" : {
        'type': "Notice of Motion",
        'title': "Notice of Motion",
        'category_of_law' : 'Criminal',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_83_template" : {
        'type': "Defense",
        'title': "Defense on claims raised",
        'category_of_law' : 'Commercial',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_84_template" : {
        'type': "Counter Claim",
        'title': "Counter Claim to Case Filed",
        'category_of_law' : 'Commercial',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_85_template" : {
        'type': "Judgment",
        'title': "Judgment",
        'category_of_law' : 'Family',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_86_template" : {
        'type': "Defense",
        'title': "Defense to land issues raised",
        'category_of_law' : 'Family',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_87_template" : {
        'type': "Plaint",
        'title': "Plaint (Fast Track)",
        'category_of_law' : 'Criminal',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_88_template" : {
        'type': "Plaint",
        'title': "Plaint (Fast Track)",
        'category_of_law' : 'Arbitration',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_89_template" : {
        'type': "Plaint",
        'title': "A case for arbitration",
        'category_of_law' : 'Arbitration',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    },
    "form_90_template" : {
        'type': "Plaint",
        'title': "Plaint (Fast Track)",
        'category_of_law' : 'Arbitration',
        'division_of_law' : 'Family',
        'sub_division' : 'Succession',
        'template_file_docx' : f'{succession_docx_folder}/Form_80.docx',
        'pdf_preview_file' : f'{succession_pdf_folder}/FORM 80-PETITION FOR LETTERS OF ADMINISTRATION INTESTATE_2.pdf',
        'form_fields' : {
            "case_number" : FormField('Case Number', 'text', "Enter Case Number").to_json(),
            "court_location" : FormField('Court Location', "text", "Enter Court Location").to_json(),
            "petitioner_name" : FormField("Petitioner's Name (Your name)", "text", "Enter Petitioner's Name").to_json(),
            "petitioner_address_description" : FormField("Address Description", "text", "Residing at Africa").to_json(),
            "petitioner_address" : FormField("Petitioner's Address", "text", "P.O Box, 1244").to_json(),
            "deceased_name": FormField("Deceased Name", "text", "Enter the name of deceased").to_json(),
            'date_of_deceased_death': FormField('Date of Deceased Death', 'date', 'Enter Date').to_json(),
            'year_of_deceased_death': FormField('Year of Deceased Death', 'text', 'Enter Year').to_json(),
            'domiciled_area': FormField('Domiciled Area', 'text', 'Enter Domiciled Area').to_json(),
            'petitioner_capacity': FormField('Petitioner Capacity', 'text', 'Enter Petitioner Capacity').to_json(),
            'petitioner_signature': FormField('Petitioner Signature', 'file', 'Enter Petitioner Signature').to_json(),
            'address_of_service': FormField('Address of Service', 'text', 'Enter Address of Service').to_json(),
        }
    }

}


def run():
    """
    Main Function
    """
    # TODO: Implement function to check whether the template has already been created
    # since this script is intended to be ran even after adding new templates
    for _ in range(5):
        for template_key, template_value in templates.items():
            Template.create_template(**template_value)
            logging.info(f'[DEBUG] Created template: {template_key}')


if __name__ == "__main__":
    run()
