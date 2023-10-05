#!/usr/bin/env python3
"""
Script for downloading forms using selenium
"""
from bs4 import BeautifulSoup as bs
import requests
import os, sys
import re
from urllib.parse import urljoin, unquote
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import urllib3

categories = {
    3 : "LAND_FORMS",
    4 : "SUCCESSION_FORMS"
}

lawris_db = "/mnt/r/lawris_db"
lawris_db_templates = os.path.join(lawris_db, "templates")

base_url = "https://www.otienocarey.co.ke/pages/download.php?id="


# Log
log_dir = "/home/tykoon787/projects/lawris/logs"
os.makedirs(log_dir, exist_ok=True)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

log_file = os.path.join(log_dir, "download_forms.log")
file_handler = logging.FileHandler(log_file, mode='w')
file_handler.setLevel(logging.DEBUG)
file_formatter = logging.Formatter('[%(asctime)s] [%(levelname)-5s]  ::    %(message)s')
file_handler.setFormatter(file_formatter)
logger.addHandler(file_handler)

# Selenium
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)


def save_pdf(content, directory: str, file_name: str, save_dir: str = lawris_db_templates):
    """
    Saves the pdf file to the specified path

    Args:
        content: Content to be written
        directory: Directory to save the file
        file_name: File name
        save_dir: Save Directory

    Return:
        Nothing
    """
    file_name = unquote(file_name).replace('%20', '_')
    pdf_dir = os.path.join(save_dir, directory)
    os.makedirs(pdf_dir, exist_ok=True)
    file_path = os.path.join(pdf_dir, file_name)

    with open(file_path, 'wb') as file:
        file.write(content)
        logging.info(f"Saved file: {directory}/{file_name}")

def download_pdf(url: str, save_dir: str):
    """
    Downloads the pdf file

    Args:
        url (str) : The url

    Return:
        Nothing
    """
    response = requests.get(f'{url}')
    if response.status_code == 200:
        save_pdf(response.content, directory=save_dir, file_name=f"{url.split('/')[-1]}")
        logging.info(f"Finished Downloading: {url.split('/')[-1]}")

def crawler():
    category = int(sys.argv[1])
    url = f"{base_url}{category}"
    logging.info(f"Fetching {categories[category]} from: {url}")
    soup = bs(requests.get(url).content, 'html.parser')
    a_links = soup.select('a')
    href_values = [tag.get('href') for tag in a_links]
    pdf_pattern = re.compile(r".*\.pdf$")

    for href in href_values:
        if type(href) == str:
            logging.info(f"Looking for pattern: {pdf_pattern} from {href}")
            if pdf_pattern.match(href):
                # If url is a relative url, convert it to an absolute url
                abs_url = urljoin(url, href)
                logging.info(f"Absolute URL: {abs_url}")
                download_pdf(abs_url, categories[category])

            else:
                logging.info(f"Skipping Download: {href}")

def crawler_v2():
    """
    Downaloads the pdf files with selenium
    """
    category = int(sys.argv[1])
    url = f"{base_url}{category}"
    logging.info(f"Fetching {categories[category]} from: {url}")

    # Load the page
    driver.get(url)
    driver.implicitly_wait(10)

    select = Select(driver.find_element(By.NAME, 'samp_length'))
    select.select_by_value('100')

    while True:
        table = driver.find_element(By.CLASS_NAME, 'dataTable')
        rows = table.find_elements(By.TAG_NAME, 'tr')

        for row in rows:
            cells = row.find_elements(By.TAG_NAME, 'td')
            if len(cells) > 1:
                pdf_links = cells[1].find_elements(By.TAG_NAME, 'a')
                for link in pdf_links:
                    href = link.get_attribute('href')
                    if href.endswith('.pdf'):
                        abs_url = urljoin(url, href)
                        download_pdf(abs_url, categories[category])

        next_link = driver.find_element(By.LINK_TEXT, 'Next')
        if 'disabled' in next_link.get_attribute('class'):
            logging.info('No more files to download')
            break

        next_link.click()

    driver.quit()

if __name__ == "__main__":
    crawler_v2()