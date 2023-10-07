import requests
from msal import ConfidentialClientApplication

# Authenticating onedrive
CLIENT_ID = "93316bb1-b15b-431c-8071-f0b3fd36504e"
CLIENT_SECRET = "dsS8Q~eC8x1QMkARSvK8n4KWOLBl5qU0TrGtXbms"
TENANT_ID = "f8cdef31-a31e-4b4a-93e4-5f571e91255a"
AUTHORITY=f"https://login.microsoftonline.com/{TENANT_ID}"

def run():
    app = ConfidentialClientApplication(
        CLIENT_ID,
        client_credential=CLIENT_SECRET,
        authority=AUTHORITY
    )

    result = app.acquire_token_silent(
        ["https://graph.microsoft.com/.default"],
        account=None
    )

    if not result:
        result = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])

    print("Result: {}".format(result))
    if "access_token" in result:
        headers = {
            'Authorization' : 'Bearer {}'.format(result['access_token'])
        }

        # ive_url = "https://graph.microsoft.com/v1.0/me/drive/root/children"
        # ive_r = requests.get(drive_url, headers=headers)
        #rive_data  = drive_r.json()

        # int(f"Drive data: {drive_data}")
        # r item in drive_data['value']:
        #     print(item)

        # Search for a user by UPN
        user_search_url = "https://graph.microsoft.com/v1.0/users?$filter=userPrincipalName eq 'tykoon787@protonmail.com'"
        user_search_r = requests.get(user_search_url, headers=headers)
        user_search_data = user_search_r.json()

        if 'value' in user_search_data and len(user_search_data['value']) > 0:
            user_id = user_search_data['value'][0]['id']
            print(f"User ID: {user_id}")
        else:
            print("User not found.")

