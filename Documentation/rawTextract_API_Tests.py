import requests

url = "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/textract"

headers = {
    "Content-Type": "application/json"
}

payload = {
  "filename": "ajwitt2@asu.edu/receiptcostco2.jpg"
}

response = requests.post(url, json=payload, headers=headers).json()

r1_meta_data = response["storeAndTimeStamp"]

r1_meta_data_correct = {
    "Store": "COSTCO", 
    "Date": "2021-08-27", 
    "Time": "17:36:19", 
    "Total": "201.33"
}

r1_data = response["data"]

r1_data_correct = {
    "Paper Towel": ["Paper Towel", 19.99, 1, 0, 'na'],
    "Tissue": ["Tissue", 16.99, 1, 0, 'na'],
    "1% Milk": ["1% Milk", 19.99, 2, 0, 'na'],
    "Water Bottles 500 ml": ["Water Bottles 500 ml", 3.79, 2, 0, 'na'],
    "Toilet Paper": ["Toilet Paper", 22.99, 1, 0, 'na'],
    "Greek Yogurt": ["Greek Yogurt", 9.49, 1, 0, 'na'],
    "Taco Seasoning": ["Taco Seasoning", 4.99, 1, 0, 'na'],
    "Frosted Flakes": ["Frosted Flakes", 8.99, 1, 0, 'na'],
    "1704012 WELCH'S 60CT": ["1704012 WELCH'S 60CT", 9.49, 1, 0, 'na'],
    "Post-It Notes": ["Post-It Notes", 8.99, 2, 0, 'na'],
    "324143 PURE PROTEIN": ["324143 PURE PROTEIN", 15.99, 1, 0, 'na'],
    "379252 GF CKN FLNGS": ["379252 GF CKN FLNGS", 9.99, 2, 0, 'na'],
    "1465453 OLDDUTCH725G": ["1465453 OLDDUTCH725G", 5.99, 1, 0, 'na']
}

count = 4.0
num_errors = 0.0
if r1_meta_data_correct["Store"] != r1_meta_data["Store"]:
    num_errors += 1.0
if r1_meta_data_correct["Date"] != r1_meta_data["Date"]:
    num_errors += 1.0
if r1_meta_data_correct["Time"] != r1_meta_data["Time"]:
    num_errors += 1.0
if r1_meta_data_correct["Total"] != r1_meta_data["Total"]:
    num_errors += 1.0

for x in r1_data:
    if x[0] in r1_data_correct:
        count += 5.0
        for i in range(5):
            if x[i] != r1_data_correct[x[0]][i]:
                num_errors += 1.0
    else:
        num_errors += 1.0

print("errors: ", num_errors, "/", count, " = ", num_errors/count)
print("Accuracy: ", (1.0-num_errors/count)*100, "%" )
#print("Response Body:", response)
