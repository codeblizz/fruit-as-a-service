ALTER TABLE inventory 
ADD COLUMN packaging_unit packaging_unit_type;

ALTER TABLE inventory 
ALTER COLUMN packaging_unit TYPE packaging_unit_type 
USING packaging_unit::packaging_unit_type;

ALTER TABLE inventory 
ADD COLUMN packaging_unit VARCHAR(50) DEFAULT 'kg' NOT NULL,
ADD CONSTRAINT check_packaging_unit_values 
CHECK (packaging_unit IN ('kg', 'bag', 'box', 'dozen', 'crate', 'basket', 'hamper', 'carton'));

-- Update any existing NULLs to 'kg' before setting the constraint
UPDATE inventory 
SET packaging_unit = 'kg' 
WHERE packaging_unit IS NULL;

-- Now you can safely run the NOT NULL command
ALTER TABLE inventory 
ALTER COLUMN packaging_unit SET NOT NULL;

-- 1. Drop the existing default constraint
ALTER TABLE inventory ALTER COLUMN packaging_unit DROP DEFAULT;

-- 2. Change the column type with an explicit cast
-- (The USING clause tells Postgres how to convert the existing string data)
ALTER TABLE inventory 
ALTER COLUMN packaging_unit TYPE packaging_unit_type 
USING packaging_unit::packaging_unit_type;

-- 3. Re-add the default value using the new type
ALTER TABLE inventory 
ALTER COLUMN packaging_unit SET DEFAULT 'kg'::packaging_unit_type;