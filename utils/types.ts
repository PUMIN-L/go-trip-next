export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string; redirect?: string }>

export type Product = {
  image: string
  name: string
  id: string
  country: string
  description: string
  trendingTrip: boolean
  price: number
  createdAt: Date
  updatedAt: Date
  clerkId: string
}

import { Prisma } from "@prisma/client"

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>
