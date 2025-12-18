package com.fruit.service.util;

public class SanitizeUtil {

    /**
     * Placeholder method for HTML/text input sanitization.
     * In a production environment, this should use a robust library 
     * like the OWASP Java HTML Sanitizer to prevent XSS.
     * * @param input The raw user input string.
     * @return The sanitized string.
     */
    private String sanitizeHtmlInput(String input) {
        if (input == null) {
            return "";
        }
        // Basic encoding for demonstration: replace characters that break HTML/XML
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");

        // NOTE: For true HTML output sanitization, use a library's policy for stripping tags.
        // For text placed directly into HTML content, basic character encoding is often sufficient.
    }
}
