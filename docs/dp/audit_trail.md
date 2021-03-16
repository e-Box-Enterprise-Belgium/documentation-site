---
title: Audit trails requirements
---

Every Document Provider has the right to define its own audit trails system. 
The following document describes the minimum requirements on audit trail for each integration with e-Box Federated Enterprise. 
So this step is needed so that the e-Box integration team checks that those minumm requirements are fulfilled and plays a role as advisor for the complete audit trails process.

## Context

+ The eBox Enterprise system allows a company to consult through the eBox Enterprise GUI its own documents that are managed in external Document Providers (DP) that were received by the DPs from public entity Document Senders (DS).

+ This document is based on the official documentation of the audit trail requirements defined at BOSA. Since we both manage e-Box, we uniformize the most this part of the on-boarding process
There are some subtilities linked to the business of e-Box entreprise and for BOSA to the business of e-Box citizen, so we will manage a documentation at e-Box entreprise and ONSS too.

## Audit Trail - Audit Logging
The scope of audit trail or also called audit logging for EBox Enterprise system is to manage information that proves in a non-repudiable way "who" or "what" did what and when on "enterprise-owned data" in the EBox Enterprise system. "Who" might be the "owner" of the data or the data might have a different owner.
Other requirements to be imposed on all EBox Enterprise subsystems when writing audit information :


Audit trail REQ Number| Requirement | Description
----------------------|-------------|------------     
ATREQ01 | Non-repudiation | Audit logging data must not be modifiable and not be deletable within the legal retention period of 10 years. From the first January 1st onwards after the moment the action was performed for which the audit logging was written (so in worst case might be almost 11 years). Non-repudiation applies on the phases when the audit logging is written or being written.
ATREQ02 | Not overproportional | Audit logging data content must be proportional meaning : minimal to no duplication, only audit info that is relevant for the audit purposes.
ATREQ03 | Respects privacy requirements | Audit logging data must be secured so that it could only be consulted when you have the appropriate authorizations. This also means that searchable metadata on audit data must be properly protected (e.g. hash citizen identification number if part of metadata).
ATREQ04 | Only audit log successful transactions | Only audit log the transaction that has to be audit logged when it is successful. 


##### Description for ATREQ04
This means for API Calls:
* if API Call is a read-only operation (GET): don't audit log if it fails with HTTP technical error code, timeout, ...
* if API Call is a write operation POST / PUT / DELETE / PATCH: always audit log, except when it is certain that the transaction didn't succeed (e.g. socket timeout because server not available). You might have borderline cases : e.g. a receive timeout occurs during the POST but in the end the transaction might or might not have succeeded on server-side : 
in this case audit log (the API Call response code written in the audit log will indicate the timeout situation that occurred)



## Audit Trail Requirements for DP

Audit logging key | Audit logging information    
------------------|--------------------------                                                                                           
TIMESTAMP | Timestamp of the incoming API call. Format : ISO 8601 datetimeyyyy-mm-ddThh:mm:ss.ffffff with timezone CET GMT+1
SUBJECT_TOKEN_HASHED | SHA-256 hash of the OIDC access token (in case the incoming call uses OIDC Token)
CLIENT_ID | clientId retrieved from the OAuth token (in case the incoming call uses OAuth Token)
API_CALL_REQUEST_METHOD | API request method (POST, GET, ...)    
API_CALL_REQUEST_URL | API request URL                                                                                                              
API_CALL_RESPONSE_CODE | API call HTTP response code (or generic error code in case of timeout)                        
API_CALL_DETAILS | API call details : see below

##### API call details: exemples
- GET /ebox/messages 
  - messageId
- GET /ebox/messages/{messageId}
  - messageId 
  - paymentData.paymentDataId
- GET /ebox/messages/{messageId}/attachments 
  - messageId
  - attachment.{attachementId}.attachmentId 
  - attachment.{attachementId}.mediaType 
  - attachment.{attachementId}.size 
  - attachment.{attachementId}.digest.digestValue 
  - attachment.{attachementId}.digest.digestMethod
- GET /ebox/messages/{messageId}/attachments/{attachmentId}
  - messageId 
  - attachmentId 
  - mediaType 
  - size
  - digest.digestValue
  - digest.digestMethod
- GET /ebox/messages/{messageId}/attachments/{attachmentId}/content 
  - messageId
  - attachmentId 
  - contentId
- GET /ebox/messages/{messageId}/paymentData
  - messageId
  - paymentDataId
- POST/publishMessage 
  - originalMessageId 
  - attachments.{attachementId}.size 
  - attachments.{attachementId}.digest.digestValue 
  - attachments.{attachementId}.digest.digestMethod 
  - messageId (returned in response)
