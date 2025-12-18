package com.fruit.service.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service("thymeleafTemplateService")
public class ThymeleafTemplateService implements EmailTemplateService {

    private final TemplateEngine templateEngine;

    @Autowired
    public ThymeleafTemplateService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    @Override
    public String generateHtml(String templateName, Map<String, Object> contextVariables) {
        Context context = new Context();
        context.setVariables(contextVariables);

        return templateEngine.process(templateName, context);
    }
}