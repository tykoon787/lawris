#!/usr/bin/env python3
"""
Script for downloading all cases from the Databases in chunks

This script attempts to download two versions of the file:
    a) With metadata - PDF file with metadata about the case
    b) Without metadata - If the first pdf file is not found, the second file is donwloaded


Author:
    Oduor Otieno E. (tykoon787)
    Github: github.com/tykoon787
"""

import json
import aiofiles
import re
from urllib.parse import unquote
import os
from tqdm import tqdm
import logging
import random
import asyncio
import aiohttp

base_url = f"http://kenyalaw.org/caselaw/cases/export/"
base_url_meta = f"http://kenyalaw.org/caselaw/cases/export_meta/"

# Save Directory
save_directory = "/mnt/r/lawris_db/caselaws_v2"
os.makedirs(save_directory, exist_ok=True)

# Save file for unfound files
unfound_files = "/home/tykoon787/projects/lawris/logs/unfound_files_v2.log"
os.makedirs(os.path.dirname(unfound_files), exist_ok=True)

# Save file for timedout files
timedout_files = "/home/tykoon787/projects/lawris/logs/timedout_files_v2.log"
os.makedirs(os.path.dirname(timedout_files), exist_ok=True)

# Save file for client error e.g., when no internet
client_err_file = "/home/tykoon787/projects/lawris/logs/client_err_file_v2.log"
os.makedirs(os.path.dirname(client_err_file), exist_ok=True)

# Set for client error
client_err_cases = set()

# Persistence to track last downloaded files per chunk
last_downloaded = "/home/tykoon787/projects/lawris/logs/last_downloaded_v2.json"
os.makedirs(os.path.dirname(last_downloaded), exist_ok=True)

# Logs
log_dir = "/home/tykoon787/projects/lawris/logs"
os.makedirs(log_dir, exist_ok=True)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

log_file = os.path.join(log_dir, "caselaw_dload_v2.log")
file_handler = logging.FileHandler(log_file, mode="a")
file_handler.setLevel(logging.DEBUG)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

file_formatter = logging.Formatter(
    '[%(asctime)s] [%(levelname)-5s]  ::    %(message)s')
console_formatter = logging.Formatter(
    '[%(levelname)-5s]  ::    %(message)s')
file_handler.setFormatter(file_formatter)
console_handler.setFormatter(console_formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

# Default file name
DEFAULT_FILE_NAME_COUNTER = 0
DEFAULT_FILE_NAME = f"case_{DEFAULT_FILE_NAME_COUNTER}"

last_successful_case_ids = {}

not_found = []

# Chunks to download at least 5 files at once
CONCURRENT_CHUNKS = [
    {'ll': 1, 'ul': 15000},      # 15,000 files
    {'ll': 15001, 'ul': 30000},  # 15,000 files
    {'ll': 30001, 'ul': 45000},  # 15,000 files
    {'ll': 45001, 'ul': 60000},  # 15,000 files
    {'ll': 60001, 'ul': 75000},  # 15,000 files
    {'ll': 75001, 'ul': 90000},  # 15,000 files
    {'ll': 90001, 'ul': 105000},  # 15,000 files
    {'ll': 105001, 'ul': 120000},  # 15,000 files
    {'ll': 120001, 'ul': 135000},  # 15,000 files
    {'ll': 135001, 'ul': 150000},  # 15,000 files
    {'ll': 150001, 'ul': 165000},  # 15,000 files
    {'ll': 165001, 'ul': 180000},  # 15,000 files
    {'ll': 180001, 'ul': 195000},  # 15,000 files
    {'ll': 195001, 'ul': 210000},  # 15,000 files
    {'ll': 210001, 'ul': 225000},  # 15,000 files
    {'ll': 225001, 'ul': 240000},  # 15,000 files
    {'ll': 240001, 'ul': 255000},  # 15,000 files
    {'ll': 255001, 'ul': 270000},  # 15,000 files
    {'ll': 270001, 'ul': 285000},  # 15,000 files
    {'ll': 285001, 'ul': 300000}   # The remaining files
]


async def download_chunk(chunk: dict):
    """
    Downloads cases in chunks
    """
    lower_limit = chunk['ll']
    upper_limit = chunk['ul']

    # Read from last_downloaded.json
    try:
        with open(last_downloaded, 'r') as last_downloaded_json_file:
            last_successful_case_ids = json.load(last_downloaded_json_file)
    except (FileNotFoundError, json.decoder.JSONDecodeError):
        last_successful_case_ids = {}

    # Get the last successfull case_id this chunk
    last_successful_case_id = last_successful_case_ids.get(
        json.dumps(chunk), lower_limit)

    if last_successful_case_id == upper_limit:
        logging.info(
            f"🗃[{chunk}] has already been fully downloaded. Skipping")
        return

    # Always check for internet connection
    while True:
        internet_available = await is_internet_available()
        if not internet_available:
            logging.info(f"🌐 NO INTERNET. Retrying in 60 Seconds")
            await asyncio.sleep(60)
            continue

        async with aiohttp.ClientSession() as session:
            for case_id in range(last_successful_case_id, upper_limit):
                try:
                    logging.info(f"🟢 Starting Download for file [{case_id}]")
                    async with session.get(f"{base_url_meta}{case_id}/pdf", timeout=120) as response_meta:
                        if response_meta.status == 200:
                            await download_file(chunk, response_meta, case_id)
                        else:
                            logging.error(
                                f"🔴 Failed to download file [{case_id}] from URL with metadata- HTTP Status: {response_meta.status}")

                            # Retry download for pdf without metadata
                            logging.info(
                                f" Retrying download for file [{case_id}] without metadata")
                            async with session.get(f"{base_url}{case_id}/pdf", timeout=120) as response_no_meta:
                                if response_no_meta.status == 200:
                                    await download_file(chunk, response_no_meta, case_id)
                                else:
                                    logging.error(
                                        f"🔴 Failed to download [{case_id} from URL without metadata - HTTP Status: {response_no_meta.status}]"
                                    )
                                    not_found.append(case_id)
                                    update_unfound(unfound_files, case_id)
                                    await sleep()

                except aiohttp.ClientError as client_err:
                    logging.error(f"🔴 HTTP Error: {client_err}")
                    update_client_err(client_err_file, case_id)
                except asyncio.TimeoutError:
                    logging.error(
                        f"🔴 Timeout Error: Timeout for file {case_id}")
                    update_timedout(timedout_files, case_id)
                    # sleep()
                except IOError as io_err:
                    logging.error(f"🔴 I/O Error: {io_err}")
                except Exception as e:
                    logging.error(f"🔴 An unexpected error occurred: {e}")

        # Once done, return the unfound files
        return not_found


def update_unfound(path: str, case_id: int):
    """
    Logs the unfound files
    """
    with open(path, 'a') as unfound:
        logging.info(f"❌ Added file [{case_id}] to unfound")
        unfound.write(str(case_id) + "\n")


def update_timedout(path: str, case_id: int):
    """
    Log files that timedout
    """
    with open(path, 'a') as timedout:
        logging.info(f"❌ Added file [{case_id}] to timedout")
        timedout.write(str(case_id) + "\n")


def update_client_err(path: str, case_id: int):
    """
    Log files that failed to download due to client err
    """
    client_err_cases.add(case_id)
    with open(path, 'w') as client_err:
        json.dump(list(client_err_cases), client_err)
        logging.info(f"❌ Added file [{case_id}] to client_err")
        # client_err.write(str(case_id) + "\n")


async def sleep():
    sleeping = random.randint(1, 5)
    # sleeping = 3
    logging.info(f"Sleeping for '{sleeping}' sec")
    await asyncio.sleep(sleeping)


async def download_file(chunk: dict, response: aiohttp.ClientResponse, case_id: int):
    """
    Downloads the actual pdf file
    """
    # Extract the file name
    if 'Content-Disposition' in response.headers:
        content_disposition = response.headers['Content-Disposition']
        filename_match = re.search(
            r'filename="(.+)"', content_disposition)
        if filename_match:
            file_name = unquote(filename_match.group(1))
        else:
            logging.error(f"🔴 Filename not found.")
            logging.info(
                f"✔ Defaulting to default filename: {DEFAULT_FILE_NAME}")
            file_name = DEFAULT_FILE_NAME
            DEFAULT_NAME_COUNTER += 1

        # Save path
        save_path = os.path.join(save_directory, file_name)

        # Check if the file is present
        if os.path.exists(save_path):
            logging.info(
                f"🟡 File [{file_name}] for [{case_id}] already exists. Skipping Download")
            await sleep()
        else:
            # make the save path dir
            os.makedirs(os.path.dirname(
                save_path), exist_ok=True)

            # Save the file
            file_size = int(
                response.headers.get('Content-Length', 0))
            desc = f"[📥] Downloading [{case_id}]: {file_name}"
            chunk_size = 1024

            # Add a progress bar to indicate downloading
            progress_bar = tqdm(total=file_size,
                                desc=desc, unit='B',
                                unit_scale=True,
                                colour='GREEN',
                                dynamic_ncols=True)

            # Write to the file
            async with aiofiles.open(save_path, 'wb') as case_file:
                while True:
                    read_chunk = await response.content.read(chunk_size)
                    if not read_chunk:
                        # logging.info(
                        #     f"No more chunks to read for [{case_id}]. BREAKING")
                        break
                    await case_file.write(read_chunk)
                    progress_bar.update(len(read_chunk))

            # Close the progress bar
            progress_bar.close()

            logging.info(
                f"💾 Downloaded [{case_id}] : '{file_name}'")

            # Write to last_downloaded.json
            await write_to_last_downloaded(last_successful_case_ids, chunk, last_downloaded, case_id)
    else:
        logging.error(
            f"🔴 Content Disposition not found in response for this request [{case_id}]")
        not_found.append(case_id)
        update_unfound(unfound_files, case_id)


async def write_to_last_downloaded(last_successful_case_ids: dict, chunk: dict, last_downloaded: str, case_id: int):
    """
    Writes the last downloaded file for a chunk
    """
    last_successful_case_ids[json.dumps(
        chunk)] = case_id
    with open(last_downloaded, 'w') as last_downloaded_json_file:
        json.dump(last_successful_case_ids,
                  last_downloaded_json_file)
    await sleep()


async def is_internet_available() -> bool:
    """
    Checks to see if an internent connection is available.

    If not, it will enter a retry loop
    """
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get('https://www.google.com') as response:
                if response.status == 200:
                    return True
    except:
        return False


async def main():
    """
    Main Function
    """
    tasks = [download_chunk(chunk) for chunk in CONCURRENT_CHUNKS]
    results = await asyncio.gather(*tasks)

    for chunk, unfound_files in zip(CONCURRENT_CHUNKS, results):
        logging.info(f"Unfound Files for chunk {chunk}: {unfound_files}")

if __name__ == "__main__":
    asyncio.run(main())
