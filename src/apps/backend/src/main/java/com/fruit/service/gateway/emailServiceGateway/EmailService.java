package com.fruit.service.gateway.emailServiceGateway;

import com.fruit.service.dto.email.EmailDetails;


public interface EmailService {

    public void sendEmail(EmailDetails emailDetails);
}
