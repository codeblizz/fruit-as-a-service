package com.fruit.service.enums;

import com.fruit.service.infrastructure.persistence.PersistableEnum;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum PackagingUnit implements PersistableEnum {
    KG("kg"),
    BAG("bag"),
    BOX("box"),
    DOZEN("dozen"),
    CRATE("crate"),
    BASKET("basket"),
    HAMPER("hamper"),
    CARTON("carton");

    private final String value;

    PackagingUnit(String value) {
        this.value = value;
    }

    @Override
    @JsonValue
    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
