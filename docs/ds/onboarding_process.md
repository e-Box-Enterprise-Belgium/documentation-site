---
title: Onboarding process to become a Document Sender
sidebar_label: Onboarding
---

![Diagram: DocSender onboarding process](/doc_media/docSenderOnboardingProcess.png)

## DocSender initial request
In practice, a new e-Box integration request can be sent to [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be).
The first mail should explain in a high-level way what is expected as a new e-Box DocSender, for which business/use cases, a first idea of the volume (number of documents sent, moment of possible load peaks…) and the expected planning. 
Questions can be adressed to this functional mailbox as well.

## Agreement in principle of the NSSO
Before starting any integration, it is necessary to obtain a first agreement in principle from the NSSO.
This agreement will be requested by the eBoxIntegration team to the NSSO e-Box managers. 

## Formal request
A formal request must then be submitted via an online form in order to become a new e-Box docSender:
- [Document Sender Onboarding form (French)](https://www.onboarding.eboxenterprise.be/content/forms/af/ebox/full-onboarding-document-sender-form.html?afAcceptLang=fr)
- [Document Sender Onboarding form (Dutch)](https://www.onboarding.eboxenterprise.be/content/forms/af/ebox/full-onboarding-document-sender-form.html?afAcceptLang=nl)

If there is a problem with the online form, you can download [the offline form as a docx file in French](https://www.eboxenterprise.be/fr/documents/word/e-Box_Entreprise_FicheDemandeEnvoi_FR.docx) or [in Dutch](https://www.eboxenterprise.be/nl/documenten/word/e-Box_Enterprise_Aanvraagfiche_NL.docx) and send it completed to [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be).

## Request validation
The eBoxIntegration team is responsible for technically validating the received form.
A formal validation of the NSSO is confirmed at this stage.
Once validated, the form is sent back to you as soon as the configuration is ready to be used.

## Order your X.509 certificate
In order to call the e-Box Publication service, you will need a [X.509 certificate](../common/x509_certificate.md).
Any official issuer is acceptable. Please avoid to use a self-signed certificate.
Please pay attention to respect [the expected format](../common/x509_certificate.md).
It’s also important to have a distinct certificate for each work environment (Acceptance, Production).
Once you receive your order, send the public part of the certificate to [eBoxIntegration](mailto:eBoxIntegration@smals.be).

## e-Box technical integration and tests 
Once the needed configuration is ready, you can proceed to the technical integration with the e-Box system.
A very important point is then to test and check that your integration with the e-Box system matches what you wanted.
You can request to have test cases via [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be).

## Go to next environment
When your tests are completed and conclusive, you can request to move to the following environment (Acceptance; Production), still via [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be).

## Production-ready
Once the configuration is ready in the Production environment, your [integration with the e-Box system](document_sender.md) can go “live”. Congratulations, your organization is now a new e-Box DocSender!
