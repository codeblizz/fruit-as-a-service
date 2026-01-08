// package com.fruit.service.gateway.emailServiceGateway;

// import org.springframework.stereotype.Service;

// import com.fruit.service.dto.email.EmailDetails;

// @Service("mailgunEmailService")
// public class MailgunEmailService implements EmailService {

//     @Override
//     public void sendEmail(EmailDetails details) {
//         System.out.println("--- Using Mailgun ---");
//         System.out.println("To: " + details.recipientEmail() + ", Subject: " + details.subject() + ", TextBody: "
//                 + details.textTemplate() + ", HtmlBody: "
//                 + details.htmlTemplate() + ", Attachment: "
//                 + details.attachments());
//     }

// }
