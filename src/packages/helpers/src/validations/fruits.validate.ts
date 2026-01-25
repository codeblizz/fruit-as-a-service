import { string, z } from "zod";
import CONSTANT from "../constants";

export const PriceCardDetailSchema = z.object({
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  cardNo: z.string(),
  images: z.array(z.object({ id: z.number(), imageUrl: string() })),
  sellerName: z.string(),
  description: z.string(),
});

export const FruitSchema = z
  .object({
    botanicalName: z
      .string()
      .min(3, "Botanical Name is required (min 3 characters)"),
    commonName: z.string().min(2, "Common Name is required (min 2 characters)"),
    originCountry: z.string().min(2, "Fruit origin country is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),

    images: z
      .array(z.instanceof(File))
      .min(
        CONSTANT.ADD_FRUIT_MIN_IMAGES,
        `At least ${CONSTANT.ADD_FRUIT_MIN_IMAGES} image(s) required`
      ),

    unitPrice: z
      .string()
      .min(1, "Price is required.")
      .regex(/^\d+(.\d{1,2})?$/, "Invalid price format. Use e.g., 10 or 10.99")
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, "Price must be greater than zero"),

    currentStock: z
      .string()
      .min(1, "Stock quantity is required.")
      .regex(/^\d+$/, "Stock must be a whole number")
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, "Stock quantity cannot be negative"),

    categoryName: z
      .string({ invalid_type_error: "Category is required" })
      .min(1, "Please select a category"),

    harvestDate: z.string().min(1, "Harvest date is required"),

    expiryDate: z.string().min(1, "Expiry date is required"),

    supplier: z.string().trim().min(2, "Supplier name is required"),

    batchNumber: z
      .string()
      .min(1, "Batch number is required")
      .regex(
        CONSTANT.BATCH_NUMBER_REGEX,
        "Invalid format. Expected: BN-YYYY-ABC-0A7"
      ),
  })
  .refine(
    (data) => {
      // Logic to ensure Expiry is after Harvest
      const harvest = new Date(data.harvestDate);
      const expiry = new Date(data.expiryDate);
      return expiry > harvest;
    },
    {
      message: "Expiry date must be after the harvest date",
      path: ["expiryDate"],
    }
  );

export const FruitCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  kinds: z.array(z.string().min(1)),
});

const fruitObject =
  FruitSchema instanceof z.ZodEffects ? FruitSchema.innerType() : FruitSchema;

export const FruitInventorySchema = z
  .object({
    unitPrice: fruitObject.shape.unitPrice.optional(),
    harvestDate: fruitObject.shape.harvestDate.optional(),
    expiryDate: fruitObject.shape.expiryDate.optional(),
    quantityAvailable: fruitObject.shape.currentStock.optional(),
    batchNumber: fruitObject.shape.batchNumber.optional(),
    supplier: fruitObject.shape.supplier.optional(),
    createdAt: z.string(),
    inventoryId: z.string().uuid(),
    quantityReserved: z.number().nonnegative().default(0),
    status: z.enum(["IN_STOCK", "OUT_OF_STOCK", "BACKORDERED"]),
    updatedAt: z.string(),
  })
  .refine(
    (data) => {
      if (data.harvestDate && data.expiryDate) {
        return new Date(data.expiryDate) > new Date(data.harvestDate);
      }
      return true;
    },
    { message: "Expiry date must be after harvest", path: ["expiryDate"] }
  );

export type FruitFormInput = z.input<typeof FruitSchema>;
export type FruitFormData = z.output<typeof FruitSchema>;
export type PriceCardDetail = z.infer<typeof PriceCardDetailSchema>;
export type FruitCategory = z.infer<typeof FruitCategorySchema>;
export type FruitInventory = z.infer<typeof FruitInventorySchema>;
