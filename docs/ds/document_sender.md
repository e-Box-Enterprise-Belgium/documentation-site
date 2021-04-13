---
title: Becoming a Document Sender
---

There are two ways to integrate: through SOAP or through REST. 
The REST integration is the new and privileged way but the [SOAP specifications](../spec/specifications_SOAP.md) are still available.

Publication happen through the ```/publishMessage``` method of the [e-Box RESTful API](../spec/specifications.md).
This method uses a multipart HTTP POST to send up to 6 documents attached to a an e-Box Message.
The API fully support [end to end streaming](#end-to-end-streaming-considerations).

The authentication has to be done via a [OAuth2 token request](#getting-an-oauth-token-for-publication). See the [Document Sender onboarding process](onboarding_process.md) to configure your enterprise as a new OAuth client.

## Minimal publication example

The following is pretty much the simplest publication request that can be made. It is comprised of the following HTTP parts:

1) ``messageToPublish``: This part contains the meta information of the message.
Example:
```json
messageToPublish: {
    "recipient": {
      "eboxType": "enterprise",
      "eboxIdValue": "0123456789"
    },
    "subject": {
      "fr": "Message de test"
    },
    "senderApplicationId": "db2b.SPFETCS-FODWASO.fgov.be",
    "messageTypeId": "SpfFodSocialElections",
    "senderOrganizationId": "0123456789",
    "attachments": [
        {
          "httpPartName": "upfile1",
          "mainContent": true,
          "attachmentSigned": false
        }
    ],
    "bodyMainContent": false,
    "replyAuthorized": false
}
```

2) ``upfile1``: This part MUST contain the binary and basic meta information of the document. It is a standard HTTP binary file upload part which needs to specify the following information:

- data stream: the raw data of the content
- filename: the file name of the document
- Content-Type: the [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) of the document

```
Content-Disposition: form-data; name="upfile1
"; filename="MyTestDocument.pdf"
Content-Type: application/pdf

(data)
``` 

**Note**: The ``upfile1`` part and the extra meta information of the document are linked together through ``"httpPartName": "upfile1"`` in the ``messageToPublish`` part.

### Response

Provided that the request is correct, one can expect a ``201`` status code to be issued with our without an additional information ``code`` in the JSON response body.

### NO_DIGITAL_USER response code

This code allows the Document Sender to know that the publication was to a recipient that never opened his e-Box.
This is the preferred method for a Sender to determine if the User uses his e-Box or not.
An alternative to this is to use the [e-Box Federation WS](../federation/federation_ws.md) but this requires to integrate with another web service and does not fit the "e-Box First" philosophy we are trying to push. 

### For the attention of

If the publication is for the attention of a particular person, a ``ForTheAttentionOf`` object has to be added in the ``messageToPublish``.
Example:
```json
        "forTheAttentionOf": {
          "type": "person",
          "id": "84022711080",
          "name": "John Doe"
        }
```
The ``type`` is used to determine if the attention is for a person or a group of person. For the moment, only ``"person"`` is suported. The ``id`` property is the National Register Number.

## Minimal publication example for a citizen
If the recipient is a citizen, the example below show a minimal publication.

```json
messageToPublish: {
    "recipient": {
      "eboxType": "citizen",
      "eboxIdValue": "71022722580"
    },
    "subject": {
      "fr": "Message de test"
    },
    "senderApplicationId": "employment:job-attest:werkkaart",
    "messageTypeId": "WK1-ACTIVA",
    "senderOrganizationId": "0123456789",
    "attachments": [
        {
          "httpPartName": "upfile1",
          "mainContent": true,
          "attachmentSigned": false
        }
    ],
    "bodyMainContent": false,
    "replyAuthorized": false
}
```

The difference is in the ``recipient`` object. The ``eboxType`` becomes ``citizen`` and the ``eboxIdValue`` is the recipient SSIN.
Also you cannot let a ``messageTypeId`` and a ``senderApplicationId`` that are used only for enterprise-to-enterprise publication.

## Getting an Oauth Token for publication

The [oauth introspect example](https://github.com/e-Box-Enterprise-Belgium/examples/tree/master/ouath-introspect) shows how an Oauth token can be retrieved.
You have to request your AccessToken to the Authorization Server.
The ``GetAccessTokenV3.getAccessToken()`` method is the one responsible of getting the token.
The scope needed to publish message is ``scope:document:management:consult:ws-eboxrestentreprise:publicationsender``.

<table>
<tr><td>OAuth Authorization Server URL (ACC)</td><td>https://services-acpt.socialsecurity.be/REST/oauth/v3/token</td></tr>
<tr><td>Audience (ACC)</td><td>https://oauthacc.socialsecurity.be</td></tr>
<tr><td>OAuth Authorization Server URL (PRD)</td><td>https://services.socialsecurity.be/REST/oauth/v3/token</td></tr>
<tr><td>Audience (PRD)</td><td>https://oauth.socialsecurity.be</td></tr>
</table>

Getting a token requires having cleared the OAuth part of the onboarding. If it is not done yet, see the [Document Sender onboarding process](onboarding_process.md).

## Endpoints
Once you have got your token, you can call a method using one of these endpoints:

| Environment| Endpoint e-Box enterprise                                                           |
|------------|-------------------------------------------------------------------------------------|
| Acceptance | ``https://services-acpt.socialsecurity.be/REST/ebox/enterprise/messageRegistry/v2/``|
| Production | ``https://services.socialsecurity.be/REST/ebox/enterprise/messageRegistry/v2``      |

## End to end Streaming Considerations

The order of HTTP parts is arbitrary, each part being linked to its associated meta-data by the ``httpPartName`` property of the publication payload. This allows for end to end streaming on the Document Sender side. See the [Publication Profile Documentation](../dp/publication_profile.md#OrderOfTheHttpParts) for more information.

## Examples with Postman
If you use Postman, you might be interested in a [Postman publication examples collection](https://github.com/e-Box-Enterprise-Belgium/examples/tree/master/postman/e-Box%20Enterprise%20REST%20Publication%20examples.postman_collection.json).
After importing that collection,
- Paste your token in the Authorization tab in the menu to edit the collection,
- Replace the ``upfile1`` to ``upfile6`` in the body of the requests with a file in your desktop,
- Replace ``senderOrganizationId``, ``senderApplicationId`` and ``messageTypeId`` with what you are authorized to use,
- Set the variable ``EndpointEnterpriseMessageRegistryV2`` with the corresponding endpoint as value, terminating with a slash.

## Our implementation choices

There are some restrictions in our implementation of the service:
- We do not support publication with several languages. Only one among ``fr``, ``nl`` and ``de`` has to be selected in a publication request for the subject, attachment title, body content and business data values.
- We do not support the ``attachmentTitle`` property in the ``AttachmentToPublish`` object. The attachment title will be the file name of the uploaded file.
- ``/linkEboxMessage`` feature is not implemented but the broadcast feature still available by asking the procedure to [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be).
- We do not support dynamic expiration date. That is to say, in the API about the ``messageToPublish`` object, the ``expirationDate`` property is ignored. The expiration date will be calculated from the current date plus the validity period defined for the message type. You can see the ``validityPeriod`` by doing a GET on ``<endpoint>/referenceData/messageTypes/<messageType-ID>``
- The business data put in a ``messageToPublish`` can only be those defined for the message type created during the [Onboarding process](onboarding_process.md).
- The ``originalMessageId`` in the ``messageToPublish`` object is only supported in the case of a reply. The value to put is the ID of the message to reply.
- We do not accept null values. If a property has to be null, like ``"registeredMail": null``, the equivalent we accept is to not put that property.
- We do not support payment data.
- Only one main content is accepted. That is to say, either bodyMainContent is true or one (and only one) of the mainContent is true.

There is also a maximum length on some strings in a publication request:
- The ``subject`` length is 400 characters maximum.
- The file name of uploaded files are 255 characters maximum.
- The value given to business data are 256 characters maximum.
- The ``name`` in a ``forTheAttentionOf`` object is 100 characters maximum.