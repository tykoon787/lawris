#!/usr/bin/env python3
"""
Download cases

NOTE: The cases in the data base 
"""

import requests
import re
from urllib.parse import unquote
import os
from tqdm import tqdm
import logging
import time
import random

base_url = f"http://kenyalaw.org/caselaw/cases/export/"

# Save Directory
save_directory = "/mnt/r/lawris_db/caselaws"
os.makedirs(save_directory, exist_ok=True)

# Logs
log_dir = "/home/tykoon787/projects/lawris/logs"
os.makedirs(log_dir, exist_ok=True)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

log_file = os.path.join(log_dir, "caselaw_dload.log")
file_handler = logging.FileHandler(log_file, mode="a")
file_handler.setLevel(logging.DEBUG)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

formatter = logging.Formatter('[%(levelname)-5s]  ::    %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

# Default file name
DEFAULT_FILE_NAME_COUNTER = 0
DEFAULT_FILE_NAME = f"case_{DEFAULT_FILE_NAME_COUNTER}"

def download_cases(LOWER_LIMIT: int, UPPER_LIMIT: int):
    for case_id in range(LOWER_LIMIT, UPPER_LIMIT):
        try:
            logging.info(f"✔ Starting Download for file [{case_id}]")
            response = requests.get(f"{base_url}/{case_id}/pdf", stream=True)

            # Extract the file name
            if 'Content-Disposition' in response.headers:
                content_disposition = response.headers['Content-Disposition']
                filename_match = re.search(r'filename="(.+)"', content_disposition)
                if filename_match:
                    file_name = unquote(filename_match.group(1))
                else:
                    logging.error(f"⚠ Filename not found.")
                    logging.info(f"✔ Defaulting to default filename: {DEFAULT_FILE_NAME}")
                    file_name = DEFAULT_FILE_NAME

                # Save path
                save_path = os.path.join(save_directory, file_name)

                # make the save path dir
                os.makedirs(os.path.dirname(save_path), exist_ok=True)

                # Save the file
                with open(save_path, 'wb') as case_file, tqdm(
                    desc=f"Downloading {file_name}",
                    total=int(response.headers.get('content-length', 0)),
                    unit='B',
                    unit_scale=True,
                    colour='GREEN',
                    dynamic_ncols=True
                ) as bar:
                    for data in response.iter_content(chunk_size=1024):
                        case_file.write(data)
                        bar.update(len(data))

                logging.info(f"✔ Downloaded : '{file_name}'")
                # Sleep randomly before the next download
                time.sleep(random.randint(2,6))
            else:
                logging.error(f"⚠ Content Disposition not found in response for this request")
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
    LOWER_LIMIT = 1
    UPPER_LIMIT = 300000
    download_cases(LOWER_LIMIT, UPPER_LIMIT)