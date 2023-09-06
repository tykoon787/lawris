#!/usr/bin/env python3
"""
A web_crawler for downloading specific pdf files
"""

from bs4 import BeautifulSoup as bs
import requests
import sys
import re
from urllib.parse import urljoin


def download_pdf(url: str):
    response = requests.get(url)
    if response.status_code == 200:
        with open(url.split('/')[-1], 'wb') as f:
            f.write(response.content)
        print("Finished Downloading: {}".format(url))


def save_to_drive(file_name):
    pass


def main():
    url = sys.argv[1]
    print("Url Entered: {}".format(url))
    soup = bs(requests.get(url).content, 'html.parser')
    a_links = soup.select('a')
    href_values = [tag.get('href') for tag in a_links]
    pdf_pattern = re.compile(r".*\.pdf$")

    for href in href_values:
        if (type(href) == str):
            if pdf_pattern.match(href):
                # Check if the href is a relative URL and convert it an absolute URL
                abs_url = urljoin(url, href)
                print(abs_url)
                # print("Downloading: {}".format(abs_url))
                # download_pdf(abs_url)
        else:
            print("Skipping Download: ".format(href))


if __name__ == "__main__":
    main()
