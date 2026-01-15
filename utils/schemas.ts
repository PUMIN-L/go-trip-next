import { z, ZodType } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be ar least 2 characters." })
    .max(100, { message: "Name must be less then 100 characters." }),
  country: z.string(),
  trendingTrip: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number."
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.trim().split(/\s+/).length
      return wordCount >= 10 && wordCount <= 100
    },
    { message: "Description must be between 10 and 1000 words." }
  )
})

export function validateWithZodSchema<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((e) => e.message)
    throw new Error(errors.join(", "))
  }
  return result.data
}

export const imageSchema = z.object({
  image: validateImageFile()
})

function validateImageFile() {
  const maxUploadSize = 2048 * 2048
  const acceptedFileTypes = ["image/"]
  return z
    .instanceof(File)
    .refine(
      (file) => {
        return !file || file.size <= maxUploadSize
      },
      { message: `File size must be less than 2 MB` }
    )
    .refine(
      (file) => {
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        )
      },
      { message: "File must be an image" }
    )
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty"
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty"
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty"
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(2, { message: "Comment must be at least 2 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" })
})

export const cartItemScheam = z.object({
  amount: z.coerce
    .number()
    .int()
    .min(1, { message: "Add item must be at least 1" }),
  priceProduct: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be at least 1" }),
  productId: z.string(),
  clerkId: z.string()
})
