#!/usr/bin/env python3
"""
Download at least 5 cases concurrently
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
from typing import List, Dict

base_url = f"http://kenyalaw.org/caselaw/cases/export/"
base_url_meta = f"http://kenyalaw.org/caselaw/cases/export_meta/"

# Save Directory
save_directory = "/mnt/r/lawris_db/caselaws"
os.makedirs(save_directory, exist_ok=True)

# Save file for unfound files
unfound_files = "/home/tykoon787/projects/lawris/logs/unfound_files.log"
os.makedirs(os.path.dirname(unfound_files), exist_ok=True)

# Save file for timedout files
timedout_files = "/home/tykoon787/projects/lawris/logs/timedout_files.log"
os.makedirs(os.path.dirname(timedout_files), exist_ok=True)

# Persistence to track last downloaded files per chunk
last_downloaded = "/home/tykoon787/projects/lawris/logs/last_downloaded.json"
os.makedirs(os.path.dirname(last_downloaded), exist_ok=True)

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
# CONCURRENT_CHUNKS = [
#     {'ll': 36695, 'ul': 50000},
#     {'ll': 50000, 'ul': 100056},
#     {'ll': 100057, 'ul': 150000},
#     {'ll': 150000, 'ul': 200160},
#     {'ll': 200161, 'ul': 250000},
#     {'ll': 250000, 'ul': 300000}
# ]
CONCURRENT_CHUNKS = [
    {'ll': 36695, 'ul': 51695},  # 15,000 files
    {'ll': 51700, 'ul': 66700},  # 15,000 files
    {'ll': 66705, 'ul': 81705},  # 15,000 files
    {'ll': 81710, 'ul': 96710},  # 15,000 files
    {'ll': 96715, 'ul': 111715},  # 15,000 files
    {'ll': 111720, 'ul': 126720},  # 15,000 files
    {'ll': 126725, 'ul': 141725},  # 15,000 files
    {'ll': 141730, 'ul': 156730},  # 15,000 files
    {'ll': 156735, 'ul': 171735},  # 15,000 files
    {'ll': 171740, 'ul': 186740},  # 15,000 files
    {'ll': 186745, 'ul': 201745},  # 15,000 files
    {'ll': 201750, 'ul': 216750},  # 15,000 files
    {'ll': 216755, 'ul': 231755},  # 15,000 files
    {'ll': 231760, 'ul': 246760},  # 15,000 files
    {'ll': 246765, 'ul': 261765},  # 15,000 files
    {'ll': 261770, 'ul': 276770},  # 15,000 files
    {'ll': 276775, 'ul': 291775},  # 15,000 files
    {'ll': 291780, 'ul': 300000}   # The remaining files
]


async def download_chunk(chunk: Dict):
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
            except asyncio.TimeoutError:
                logging.error(f"🔴 Timeout Error: Timeout for file {case_id}")
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


async def sleep():
    sleeping = random.randint(1, 5)
    # sleeping = 3
    logging.info(f"Sleeping for '{sleeping}' sec")
    await asyncio.sleep(sleeping)


async def main():
    """
    Main Function
    """
    tasks = [download_chunk(chunk) for chunk in CONCURRENT_CHUNKS]
    results = await asyncio.gather(*tasks)

    for chunk, unfound_files in zip(CONCURRENT_CHUNKS, results):
        logging.info(f"Unfound Files for chunk {chunk}: {unfound_files}")


async def download_file(chunk: Dict, response: aiohttp.ClientResponse, case_id: int):
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
            desc = f"Downloading [{case_id}]: {file_name}"
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
            # NOTE: This method doesn't work as intended
            last_successful_case_ids[json.dumps(
                chunk)] = case_id
            with open(last_downloaded, 'w') as last_downloaded_json_file:
                json.dump(last_successful_case_ids,
                          last_downloaded_json_file)
            await sleep()
    else:
        logging.error(
            f"🔴 Content Disposition not found in response for this request [{case_id}]")
        not_found.append(case_id)
        update_unfound(unfound_files, case_id)

if __name__ == "__main__":
    asyncio.run(main())
