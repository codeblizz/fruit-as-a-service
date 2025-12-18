package com.fruit.service.dto.email;

import java.util.List;

public record EmailDetails(
        String firstName,
        String verificationLink,
        String recipientEmail,
        String subject,
        String textTemplate,
        String htmlTemplate,
        List<AttachmentDetails> attachments) {
}
