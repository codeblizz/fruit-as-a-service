package com.fruit.service.gateway.emailServiceGateway;

import com.fruit.service.dto.email.AttachmentDetails;
import com.fruit.service.dto.email.EmailDetails;
import com.fruit.service.exception.EmailServiceException;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.Attachment;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;

import jakarta.annotation.PostConstruct;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service("resendEmailService")
public class ResendEmailService implements EmailService {

    @Value("${resend.api-key}")
    private String resendApiKey;

    @Value("${resend.from-email}")
    private String fromEmail;

    private Resend resendClient;

    @PostConstruct
    public void init() {
        this.resendClient = new Resend(resendApiKey);
    }

    private List<Attachment> mapAttachments(List<AttachmentDetails> details) {
        if (details == null || details.isEmpty()) {
            return Collections.emptyList();
        }

        return details.stream()
                .map(detail -> Attachment.builder()
                        .fileName(detail.fileName())
                        .content(detail.base64Content())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void sendEmail(EmailDetails details) {
        List<Attachment> attachments = mapAttachments(details.attachments());
        SendEmailRequest.Builder requestBuilder = SendEmailRequest.builder()
                .to(details.recipientEmail())
                .from(fromEmail)
                .subject(details.subject());

        if (StringUtils.hasText(details.htmlTemplate())) {
            requestBuilder.html(details.htmlTemplate());
        } else {
            requestBuilder.text(details.textTemplate());
        }

        if (!attachments.isEmpty()) {
            requestBuilder.attachments(attachments);
        }

        SendEmailRequest emailRequest = requestBuilder.build();

        System.out.println("Email request " + emailRequest);

        try {
            SendEmailResponse response = resendClient.emails().send(emailRequest);
            System.out.println("Resend email sent successfully. ID: " + response.getId());

        } catch (ResendException e) {
            System.err.println("Resend API Failure: " + e.getMessage());
            throw new EmailServiceException(
                    "Resend API failed to send email. Cause: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}