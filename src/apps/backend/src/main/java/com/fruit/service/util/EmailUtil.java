package com.fruit.service.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fruit.service.dto.email.EmailDetails;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.template.EmailTemplateService;

@Service
public class EmailUtil {
    private final EmailTemplateService emailTemplateService;

    @Value("${app.email.verification.text-subject}")
    private String verificationEmailSubject;
    @Value("${app.email.verification.text-warning}")
    private String verificationEmailWarning;
    @Value("${app.email.verification.text-mainBody}")
    private String verificationEmailMainBody;
    @Value("${app.email.verification.text-title}")
    private String verificationEmailTitle;
    @Value("${app.email.verification.text-verificationLink}")
    private String verificationTextLink;
      
    @Autowired
    public EmailUtil(@Qualifier("thymeleafTemplateService") EmailTemplateService emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }

    public EmailDetails buildEmailDetails(UserEntity user, String verificationEmailLink) {
        Map<String, Object> context = new HashMap<>();
        context.put("firstName", user.getFirstName());
        context.put("verificationLink", verificationEmailLink);
        context.put("subject", verificationEmailSubject);
        context.put("warning", verificationEmailWarning);
        context.put("title", verificationEmailTitle);
        context.put("verificationTextLink", verificationTextLink);
        context.put("main", verificationEmailMainBody);

        String htmlTemplate = emailTemplateService.generateHtml("verificationTemplate", context);
        String textTemplate = String.format(
                verificationEmailTitle,
                user.getFirstName(), verificationEmailLink);

        return new EmailDetails(
            user.getFirstName(),
            verificationEmailLink,
            user.getEmail(),
            verificationEmailSubject,
            textTemplate,
            htmlTemplate,
            Collections.emptyList());
    }
}
