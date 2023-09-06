#!/usr/bin/env python3
""""
Used to download Acts of Parliament
"""

import os
import resource
import requests
from bs4 import BeautifulSoup
import logging
import random
from typing import List
from tqdm import tqdm

base_url = "http://kenyalaw.org:8181/exist/rest//db/kenyalex/Kenya/Legislation/English/Acts%20and%20Regulations/"
save_directory = "Acts_and_Regulations"

letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
unfound_files = []

# Create Loggers to log both on the screen and the file
log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# File Handler
log_file = os.path.join(log_dir, "statute_dload.log")
file_handler = logging.FileHandler(log_file, mode="a")
file_handler.setLevel(logging.DEBUG)

# Console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# Formatter
formatter = logging.Formatter('[%(levelname)-5s]  ::    %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

# Add handlers
logger.addHandler(file_handler)
logger.addHandler(console_handler)

# Save Directory
os.makedirs(save_directory, exist_ok=True)

def extract_file_names(base_url: str, letter: str) -> List[str]
    """
    Extract File names from XML Response
    """
    collection_url = os.path.join(base_url, letter)
    response = requests.get(collection_url)
    if response.status_code == 200:
        # Parse the response
        collection_xml = response.content
        soup = BeautifulSoup(collection_xml, 'html.parser')
        collections = soup.find_all('exist:collection')

        # File names
        unformatted_file_names = []

        # Collect the unformatted file names
        for collection in collections:
            unformatted_name = collection['name']
            unformatted_file_names.append(unformatted_name)

        # Format the file names
        formatted_file_names = []
        for file_name in unformatted_file_names:
            formatted_file_name = format_file_name(base_url, letter, file_name)
            if formatted_file_name is not None:
                formatted_file_names.append(formatted_file_name)

        logging.info(f'✔✔ Extracted {len(formatted_file_names)} files: {formatted_file_names}')
        logging.info(f" ⚠ {len(unfound_files)} Unfound Files: {unfound_files}")
        return formatted_file_names


def format_file_name(base_url:str, letter: str, to_format: str):
    """
    This function retrieves the file name and formats it
    E.g., Data%20Protection%20Act%20-%20No.%2024%20of%202019 to DataProtectionAct24of2019.pdf
    
    Arguments:
        to_format __str__ : File to format
    """
    file_url = os.path.join(base_url, letter, to_format)
    try:
        response = requests.get(file_url)
        if response.status_code == 200:
            file_xml = response.content
            soup = BeautifulSoup(file_xml, 'html.parser')
            file_resource = soup.find_all('exist:resource')
            # NOTE
            # Some files don't have the exist:resource
            # Check to see if resource will be found just with the file name
            if file_resource:
                logging.debug(f'File Resource: {file_resource}')
                original_file_name = file_resource[0]['name']
                logging.debug(f'Original File name: {original_file_name}')
                file_name = os.path.splitext(original_file_name)[0] + ".pdf"
                logging.info(f'✔ Formatted file: {file_name}')
                return create_download_link(base_url, letter, to_format, file_name)
            else:
                logging.info(f'No Resource for file: {to_format}')
                # Check to see if resource will be found with route '/docs'
                route = 'docs'
                logging.info(f"Checking in route '{route}'")
                file_found = check_route(base_url, letter, to_format, route, 'resource')
                if file_found is not None:
                    file_name = os.path.splitext(file_found)[0] + ".pdf"
                    logging.info(f'✔ Formatted file: {file_name}')
                    return create_download_link(base_url, letter, to_format, file_name)
                else:
                    logging.error(f"⚠ No Resource for file: '{to_format}' even in route '{route}'")
                    logging.info(f"Proeeding to check in subsidiary legislation")
                    file_name = check_subsidiary_legislation(base_url, letter, to_format, route) 
                    if file_name is not None:
                        return create_download_link(base_url, letter, to_format, file_name, subsidiary_legislation=True)
                    else:
                        logging.error(f"⚠ No Resource for file: '{to_format}' even in subsidiary legislation'")
                        unfound_files.append(to_format)
                        return

        # Handle 404 Error
        elif response.status_code == 404:
            logging.error(f'HTTP 404 Error: Resource not found')
            return
    except requests.exceptions.RequestException as e:
        logging.error(f'HTTP Request Error: {e}')
    # except Exception as e:
    #     logging.error(f'Error Occured: {e}')

def check_route(base_url:str , letter:str, original_file_name:str, route: str, look_in: str) -> str:
    """
    Looks for the file name in the route docs

    Arguments:
        base_url: Url
        original_file_name : File name to look for
        route: The route
        look_in: Where to look for the file i.e., either collection or resource    
    """
    file_url = os.path.join(base_url, letter, original_file_name, route)
    response = requests.get(file_url)
    file_xml = response.content
    soup = BeautifulSoup(file_xml, 'html.parser')
    logging.info(f"Looking for '{original_file_name}' in '{look_in}'")
    file_resource = soup.find_all(f'exist:{look_in}')
    if file_resource:
        file_name = file_resource[0]['name']
        logging.info(f"✔ File '{file_name}' found")
        return file_name
    else:
        logging.error(f"⚠ File '{original_file_name}' not found in route '{look_in}'")
        return

def check_subsidiary_legislation(base_url: str, letter: str, file_name: str, route: str):
    """
    Checks to see if the file is a subsidiary legislation
    """
    collection_name = "subsidiary_legislation"
    file_url = os.path.join(base_url, letter, file_name)
    response = requests.get(file_url)
    file_xml = response.content
    soup = BeautifulSoup(file_xml, 'html.parser')
    logging.info(f"Looking for '{file_name}' in subsidiary legisltation")
    collections = soup.find_all('exist:collection')
    for collection in collections:
        if collection['name'] == collection_name:
            # Make a new request
            new_file_url = os.path.join(file_url, collection_name, 'docs')
            response = requests.get(new_file_url)
            new_file_xml = response.content
            new_soup = BeautifulSoup(new_file_xml, 'html.parser')
            file_resource = new_soup.find_all('exist:resource')
            file_found = file_resource[0]['name']
            file_name = os.path.splitext(file_found)[0] + ".pdf"
            logging.info(f"✔ File '{file_name}' found")
            return file_name

    logging.error(f"⚠ File '{file_name}' not found in '{collection_name}'")
    return None

def create_download_link(base_url: str, letter: str, to_format: str, file_name: str, route="docs", subsidiary_legislation=False) -> str:
    """
    Creates the donwload link for a file
    """
    if subsidiary_legislation:
        collection = "subsidiary_legislation"
        return os.path.join(base_url, letter, to_format, collection, route, file_name)
    else:
        return os.path.join(base_url, letter, to_format, route, file_name)

def download_pdfs(pdf_list: List[str], target_dir: str):
    """
    Downloads the pdf files
    """
    if pdf_list is not None:
        for link in pdf_list:
            try:
                response = requests.get(link, stream=True)
                pdf_file_name = link.split('/')[-1]
                save_path = os.path.join(save_directory, target_dir, pdf_file_name)

                # Create the directory if it doesn't exist
                os.makedirs(os.path.dirname(save_path), exist_ok=True)

                # Save the pdf file
                with open(save_path, 'wb') as pdf_file, tqdm(
                    desc=f"Dowloading {pdf_file_name}",
                    total=int(response.headers.get('content-length', 0)),
                    unit='B',
                    unit_scale=True,
                    unit_divisor=1024,
                    colour = True,
                    dynamic_ncols=True
                ) as bar:
                    for data in response.iter_content(chunk_size=1024):
                        pdf_file.write(data)
                        bar.update(len(data))

                logging.info(f"✔ Downloaded File: {link.split('/')[-1]}")
            except requests.exceptions.HTTPError as http_err:
                logging.error(f"⚠ HTTP Error: {http_err}")
            except requests.exceptions.ConnectionError as conn_err:
                logging.error(f"⚠ Connection Error: {conn_err}")
            except requests.exceptions.Timeout as timeout_err:
                logging.error(f"⚠ Timeout Error: {timeout_err}")
            except requests.exceptions.RequestException as req_err:
                logging.error(f"⚠ Request Error: {req_err}")
            except IOError as io_err:
                logging.error(f"⚠ I/O Error: {io_err}")
            except Exception as e:
                logging.error(f"⚠ An unexpected error occurred: {e}")  
                


if __name__ == "__main__":
    # Download files per category    
    for letter in letters:
        logging.info(f"Downloading Files in Category: [{letter}]")
        pdf_list = extract_file_names(base_url, letter)
        download_pdfs(pdf_list, letter)
        logging.info(f'✔✔ COMPLETED DOWNLOADING CATEGORY: [{letter}]')
        # sleep(random.randint(2,6)))