package com.fruit.service.infrastructure.persistence;

import com.fruit.service.enums.PackagingUnit;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PackagingUnitConverter extends AbstractEnumConverter<PackagingUnit> {
    public PackagingUnitConverter() { super(PackagingUnit.class); }
}