package com.fruit.service.infrastructure.persistence;

import jakarta.persistence.AttributeConverter;
import java.util.stream.Stream;
import java.lang.IllegalArgumentException;

public abstract class AbstractEnumConverter<T extends Enum<T> & PersistableEnum> 
    implements AttributeConverter<T, String> {

    private final Class<T> clazz;

    protected AbstractEnumConverter(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public String convertToDatabaseColumn(T attribute) {
        return (attribute == null) ? null : attribute.getValue();
    }

    @Override
    public T convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return Stream.of(clazz.getEnumConstants())
                .filter(e -> e.getValue().equals(dbData))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown DB value: " + dbData));
    }
}