# """
# -*- coding: utf-8 -*-
# ========================
# AWS Lambda
# ========================
# Contributor: Chirag Rathod (Srce Cde), 
# Modified by: Wenjie Xu
# ========================
# """
# #TODO: Modify workflow and trigger.
# import sys
# import traceback
# import logging
# import json
# import uuid
# import time
# import boto3
# import os
# import re
# from urllib.parse import unquote_plus
# from collections import defaultdict

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)
# textract = boto3.client("textract")
# s3 = boto3.client("s3")

# def merge_duplicates(lst):
#     unique_items = {}

#     for item in lst:
#         key = tuple(item[:2] + item[3:])  # Exclude the count at index 2
#         if key in unique_items:
#             unique_items[key][2] += item[2]  # Increment count
#         else:
#             unique_items[key] = item[:]  # Copy original item

#     return list(unique_items.values())

# def process_error() -> dict:
#     ex_type, ex_value, ex_traceback = sys.exc_info()
#     traceback_string = traceback.format_exception(ex_type, ex_value, ex_traceback)
#     error_msg = json.dumps(
#         {
#             "errorType": ex_type.__name__,
#             "errorMessage": str(ex_value),
#             "stackTrace": traceback_string,
#         }
#     )
#     return error_msg

# def extract_text(response: dict, extract_by="LINE") -> list:
#     text = []
#     for block in response["Blocks"]:
#         if block["BlockType"] == extract_by:
#             text.append(block["Text"])
#     return text

# def get_full_ocr_results(job_id):
#     """Retrieve full OCR results, handling pagination."""
#     pages = []
#     next_token = None

#     while True:
#         if next_token:
#             response = textract.get_document_text_detection(JobId=job_id, NextToken=next_token)
#         else:
#             response = textract.get_document_text_detection(JobId=job_id)

#         pages.extend(response.get("Blocks", []))

#         next_token = response.get("NextToken")
#         if not next_token:
#             break  # No more pages

#     return {"Blocks": pages}

# def parse_receipt_data(raw_data):
    
#     #Store name
#     store_name = raw_data[0] 
    
#     #Regex created by ChatGPT
#     date_time_patterns = [
#         re.compile(r"(\d{2}/\d{2}/\d{2})\s(\d{2}[: ]\d{2}[apmAPM]{2})"),  # MM/DD/YY HH:MM AM/PM
#         re.compile(r"(\d{4}/\d{2}/\d{2})\s(\d{2}:\d{2}:\d{2})"),  # YYYY/MM/DD HH:MM:SS
#         re.compile(r"(\d{2}-\d{2}-\d{4})\s(\d{2}:\d{2})"),  # DD-MM-YYYY HH:MM
#         re.compile(r"(\d{2}\.\d{2}\.\d{4})\s(\d{2}:\d{2})"),  # DD.MM.YYYY HH:MM
#         re.compile(r"(\d{2}/\d{2}/\d{4})\s(\d{2}:\d{2})"),  # MM/DD/YYYY HH:MM
#         re.compile(r"(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2})")   # YYYY-MM-DD HH:MM
#     ]
    
#     date, time = None, None
#     for item in raw_data:
#         for pattern in date_time_patterns:
#             match = pattern.search(item)
#             if match:
#                 date, time = match.groups()
#                 break
#         if date and time:
#             break
    
#     return {
#         "Store": store_name,
#         "Date": date,
#         "Time": time
#     }

# def parse_receipt_items(raw_data):
#     items=[]
#     count=[]
#     weight=[]
#     weightUnit=[]
#     for i in range(len(raw_data)):
#         if "ks" in raw_data[i]:
#             raw_data[i] = raw_data[i].replace("ks","kg")
#         unit = "na"
#         if "$" in raw_data[i]: #if has $ in front then remove everything up until price
#             raw_data[i] = raw_data[i][raw_data[i].index("$")+1:]
#             if raw_data[i][0] == " ": #if starts with space then remove.
#                 raw_data[i] = raw_data[i][1:]
#         if re.match(r"^\d+\.\d+ [A-Za-z]$", raw_data[i]): #if there is character at end. remove
#             raw_data[i] = raw_data[i][:-2]
#         match = re.match(r"^(\d+\.\d+)-.*$", raw_data[i]) #if there is - at the end, then apply discount
#         if match:
#             raw_data[i] = f"-{match.group(1)}"
#         if bool(re.match(r'^-?\d+\.\d+$', raw_data[i])):
#             #print(raw_data[i])
#             n = raw_data[i-1]
#             counter = 1
#             while ("kg" in n or "lb" in n) and counter < i: #tries to find the correct name, also saves units if found
#                 if "kg" in n:
#                     unit = "kg"
#                 if "lb" in n:
#                     unit = "lb"
#                 counter += 1
#                 n = raw_data[i-counter]
#             if len(n) == 1 or n.isdigit() or n[:-1].isdigit(): #Also tries to find the correct name
#                 counter += 1
#                 n = raw_data[i-counter]
#             if(float(raw_data[i]) < 0):
#                 if(len(items))==0:
#                     continue
#                 items[len(items)-1][1] = str(round(float(items[len(items)-1][1])+float(raw_data[i]),2)) #if its a discount, apply discount
#             elif [n,raw_data[i]] in items:
#                 count[items.index([n,raw_data[i]])] += 1 #if item already exists, increment count
#             else:
#                 x = i-counter+1
#                 w=0 
#                 while (x < i) and unit != "na": #if there is a weight to it, find the
#                     if unit in raw_data[x] and not ("/"+unit) in raw_data[x]:
#                         match = re.search(r"[-+]?\d*\.\d+", raw_data[x])
#                         if match:
#                             w = float(match.group(0))
#                     x+=1
#                 items.append([n,raw_data[i]])
#                 count.append(1)
#                 weight.append(w)
#                 weightUnit.append(unit)
#     total = 0
#     for i in range(len(items)):
#         items[i].append(count[i])
#         items[i].append(weight[i])
#         items[i].append(weightUnit[i])
#         if "total" in items[i][0].lower():
#             total = items[i][1]
        

#     items = list(filter(lambda item: not ("tax" in item[0].lower() or "total" in item[0].lower() or "deposit cl" in item[0].lower() or "enviro fee c" in item[0].lower()), items))
#     return (items,total)

# def lambda_handler(event, context):

#     try:

#         logging.info(f"Bucket: {os.getenv("BUCKETNAME")} ::: Key: {event["filename"]}")

#         if os.path.splitext(event["filename"])[1].lower()==".pdf":
#             response = textract.start_document_text_detection(
#                 DocumentLocation={
#                     "S3Object": {
#                         "Bucket": os.getenv("BUCKETNAME"),
#                         "Name": event["filename"],
#                     }
#                 }
#             )
#             job_id = response["JobId"]
#             print(f"Started Textract Job: {job_id}")

#             # Poll for job completion
#             while True:
#                 job_status = textract.get_document_text_detection(JobId=job_id)
#                 status = job_status["JobStatus"]
                
#                 if status in ["SUCCEEDED", "FAILED"]:
#                     break  # Stop polling when done
                
#                 print("Waiting for Textract to finish...")
#                 time.sleep(5)  # Wait before polling again

#             if status == "FAILED":
#                 raise Exception("Textract job failed")

#             # Retrieve the full OCR results
#             response = get_full_ocr_results(job_id)
        
#         else:
#             response = textract.detect_document_text(
#                 Document={
#                     "S3Object": {
#                         "Bucket": os.getenv("BUCKETNAME"),
#                         "Name": event["filename"],
#                     }
#                 }
#             )
#         logging.info(json.dumps(response))

#         # change LINE by WORD if you want word level extraction
#         raw_text = extract_text(response, extract_by="LINE")
#         logging.info(raw_text)
#         metaData = parse_receipt_data(raw_text)
#         if True:#"costco" in event["filename"]:
#             itemList,total = parse_receipt_items(raw_text)
#         else:
#             itemList = raw_text
#             total = 0
#         itemList = merge_duplicates(itemList)
#         metaData["Total"] = total
#         logging.info(metaData)
#         logging.info(itemList)

#         # s3.put_object(
#         #     Bucket=bucketname,
#         #     Key=f"output/{filename.split('/')[-1]}_{uuid.uuid4().hex}.txt",
#         #     Body=str("\n".join(raw_text)),
#         # )

#         return {
#             "statusCode": 200,
#             "body": json.dumps("Receipt/Document processed successfully!"),
#             "storeAndTimeStamp": metaData,
#             "data": itemList #json.dumps(raw_text),
            
#         }
#     except:
#         error_msg = process_error()
#         logger.error(error_msg)

#     return {"statusCode": 500, "body": json.dumps("Error processing the recceipt/document!")}

# Testcase:
# {
#   "filename": "receiptcostco2.jpg"
# }

# Response:
# {
#   "statusCode": 200,
#   "body": "\"Receipt/Document processed successfully!\"",
#   "storeAndTimeStamp": {
#     "Store": "COSTCO",
#     "Date": "2021/08/27",
#     "Time": "17:36:19",
#     "Total": "201.33"
#   },
#   "data": [
#     [
#       "580517 **KS TOWEL**",
#       "19.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1446056 SCOTTIES",
#       "16.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1281 1% MILK",
#       "4.75",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "ENVIRO FEE C",
#       "0.11",
#       2,
#       0,
#       "na"
#     ],
#     [
#       "0.11",
#       "0.25",
#       2,
#       0,
#       "na"
#     ],
#     [
#       "DEPOSIT CL",
#       "4.75",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "DEPOSIT CL",
#       "3.79",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "ENVIRO FEE C",
#       "1.20",
#       2,
#       0,
#       "na"
#     ],
#     [
#       "DEPOSIT CL",
#       "4.00",
#       2,
#       0,
#       "na"
#     ],
#     [
#       "500666 KS WATR500**",
#       "3.79",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "4458722 PUREX BT 250",
#       "22.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "245554 GREEK YOGURT",
#       "9.49",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "320116 TACO SEASNG",
#       "4.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "724000 FROSTED FLKS",
#       "6.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1704012 WELCH'S 60CT",
#       "9.49",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1202501 POST-ITS",
#       "8.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1202501 POST-ITS",
#       "8.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "324143 PURE PROTEIN",
#       "15.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "324143 PURE PROTEIN",
#       "15.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "379252 GF CKN FLNGS",
#       "9.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "379252 GF CKN FLNGS",
#       "9.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "1465453 OLDDUTCH725G",
#       "5.99",
#       1,
#       0,
#       "na"
#     ],
#     [
#       "00 APPROVED - THANK YOU 001",
#       "201.33",
#       1,
#       0,
#       "na"
#     ]
#   ]
# }