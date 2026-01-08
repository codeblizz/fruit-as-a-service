import { z } from "zod";

export const PriceCardDetailSchema = z.object({
    title: z.string(),
    price: z.number(),
    rating: z.number(),
    sellerName: z.string(),
    description: z.string(),
})