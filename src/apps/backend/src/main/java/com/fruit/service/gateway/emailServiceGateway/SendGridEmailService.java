// package com.fruit.service.gateway.emailServiceGateway;

// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.HttpStatus;
// import org.springframework.stereotype.Service;

// import com.fruit.service.dto.email.EmailDetails;
// import com.fruit.service.exception.EmailServiceException;
// import com.sendgrid.*;
// import com.sendgrid.helpers.mail.Mail;
// import com.sendgrid.helpers.mail.objects.Content;
// import com.sendgrid.helpers.mail.objects.Email;

// @Service("sendGridEmailService")
// public class SendGridEmailService implements EmailService {

//     @Value("${sendgrid.api-key}")
//     private String sendGridApiKey;

//     @Value("${sendgrid.from-email}")
//     private String fromEmail;


//     @Override
//     public void sendEmail(EmailDetails details) {

//         System.out.println("--- Using Mailgun ---");
//         System.out.println("To: " + details.recipientEmail() + ", Subject: " + details.subject() + ", TextBody: "
//                 + details.textTemplate() + ", HtmlBody: "
//                 + details.htmlTemplate() + ", Attachment: "
//                 + details.attachments());

//         Email from = new Email(fromEmail);
//         String subject = "Account Verification Required";
//         Email to = new Email(details.recipientEmail());

//         // The email content (use HTML for production)
//         Content content = new Content("text/plain",
//                 "Hello " + details.firstName() + ",\n\nPlease click the link to verify your account: " + details.verificationLink());

//         Mail mail = new Mail(from, subject, to, content);

//         SendGrid sg = new SendGrid(sendGridApiKey);
//         Request request = new Request();

//         request.setMethod(Method.POST);
//         request.setEndpoint("mail/send");
//         try {
//             request.setBody(mail.build());
//             Response response = sg.api(request);
//             if (response.getStatusCode() >= 300) {
//                 int statusCodeInt = response.getStatusCode();
//                 HttpStatus resolvedStatus = HttpStatus.resolve(statusCodeInt);
//                 if (resolvedStatus == null) {
//                     throw new EmailServiceException(
//                             "SendGrid failed with non-standard status code: " + statusCodeInt,
//                             HttpStatus.INTERNAL_SERVER_ERROR);
//                 }

//                 throw new EmailServiceException(
//                         "SendGrid API failed with status: " + resolvedStatus.value(),
//                         resolvedStatus);
//             }
//         } catch (IOException e) {
//             System.out.println("Some IO ecxception error occurred" + e.getMessage());
//         }

//     }
// }