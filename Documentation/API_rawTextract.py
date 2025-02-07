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
# from urllib.parse import unquote_plus

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)
# textract = boto3.client("textract")
# s3 = boto3.client("s3")

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

#         # s3.put_object(
#         #     Bucket=bucketname,
#         #     Key=f"output/{filename.split('/')[-1]}_{uuid.uuid4().hex}.txt",
#         #     Body=str("\n".join(raw_text)),
#         # )

#         return {
#             "statusCode": 200,
#             "body": json.dumps("Receipt/Document processed successfully!"),
#             "data": json.dumps(raw_text),
#         }
#     except:
#         error_msg = process_error()
#         logger.error(error_msg)

#     return {"statusCode": 500, "body": json.dumps("Error processing the recceipt/document!")}


# Testcase:
# {
#   "filename": "receiptcostco3.jpg"
# }

# Response:
# {
#   "statusCode": 200,
#   "body": "\"Receipt/Document processed successfully!\"",
#   "data": "[\"COSTCO\", \"WHOLESALE\", \"North London #530\", \"693 Wonderland Road North\", \"London, ON N6H 4L1\", \"1S Member 111791956937\", \"580517 **KS TOWEL**\", \"23.49 H\", \"893269 NYQUIL 2X354\", \"22.99 H\", \"40791 RIB STK BNLS\", \"54.22\", \"1707492 PRIME HYDRTN\", \"27.99 H\", \"1218130 PAYSAN BACON\", \"13.99\", \"190316 KS BACON\", \"9.99\", \"1780548 CRISPY ONION\", \"14.99\", \"1687657 SRIRACHA\", \"9.99\", \"1633066 AIOLI SAUCE\", \"9.79\", \"1801834 TPD/1633066\", \"2.00-\", \"1764997\", \"2,999.99\", \"H\", \"1392843 AVOCA SPRAY\", \"16.99\", \"1279452 KS COLDSINUS\", \"10.99 H\", \"1682107 CASA PIRI 1L\", \"11.49\", \"5696621 VITAFUSION\", \"14.99 H\", \"1080377 TURMERIC\", \"38.99 H\", \"1446552 JALAPENO\", \"14.99\", \"1742666 ORGANIKA\", \"54.99 H\", \"2333708 BAGEL SEASON\", \"9.49\", \"1638299 CASCADE PLAT\", \"24.99 H\", \"1677465 TRUFFLE PARM\", \"9.99\", \"11515 CAESAR SALAD\", \"13.25 H\", \"SUBTOTAL\", \"3,406.58\", \"TAX\", \"420.25\", \"**** TOTAL\", \"3,826.83\", \"XXXXXXXXXXXX3746\", \"ACCT: VISA\"]"
# }