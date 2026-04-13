import urllib.request
import json
import ssl

url = "https://api.dooray.com/admin/v2/meetings"
headers = {
    "Authorization": "dooray-api qnv3z1dfzl9l:HKSwEzs6Q8C1EnUu_eIQMw",
    "Content-Type": "application/json"
}
data = {
    "subject": "Test Meeting",
    "host": {
        "emailAddress": "test@smhrd.com",
        "name": "Admin",
        "deviceType": "pc",
        "timezoneName": "Asia/Seoul"
    }
}

req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
context = ssl._create_unverified_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        print("Status", response.status)
        print(response.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("HTTPError:", e.code)
    print("Body:", e.read().decode("utf-8"))
