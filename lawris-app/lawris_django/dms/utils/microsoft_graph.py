import requests
import json
from requests.exceptions import HTTPError

def get_access_token():
   data = {
       "client_id": "XXXXXX",
       "scope": "https://graph.microsoft.com/.default",
       "client_secret": "XXX.",
       "grant_type": 'client_credentials'
   }
   response = requests.post("https://login.microsoftonline.com/XXXX/oauth2/v2.0/token", data=data)
   
   token = json.loads(response.text)["access_token"]
   print(token)
   return token


def upload_file_to_onedrive(file_path, file_name):
    """
    Uploads a file to OneDrive

    Args:
        file_path (str): The path to the file to be uploaded
        file_name (str): The name of the file to be uploaded
    """
    try:
        access_token = get_access_token()

        # Get the drive ID and item ID for the destination folder
        drive_id = "XXXX"
        folder_id = "XXX"

        url = f"https://graph.microsoft.com/v1.0/drives/{drive_id}/items/{folder_id}:/{file_name}:/content"

        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/octet-stream",
        }

        with open(file_path, "rb") as file:
            response = requests.put(url, headers=headers, data=file)
            response.raise_for_status() 

        print("File uploaded successfully.")
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(response.text)  
    except Exception as err:
        print(f"An error occurred: {err}")