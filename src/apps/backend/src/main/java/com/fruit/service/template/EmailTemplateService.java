package com.fruit.service.template;

import java.util.Map;

public interface EmailTemplateService {
    
    String generateHtml(String templateName, Map<String, Object> context);
}
