"use server"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import db from "../utils/db"
import { deleteImage, uploadImage } from "./supabase"
import { revalidatePath } from "next/cache"
import {
  cartItemScheam,
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema
} from "./schemas"
import { Product } from "@prisma/client"

const renderError = (error: unknown): { message: string } => {
  console.log(error)
  const message = error instanceof Error ? error.message : "An error occurred"
  return { message }
}

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error("Must have user login")
  }
  return user
}

const getAdminUser = async () => {
  const user = await getAuthUser()

  if (user?.id !== process.env.ADMIN_USER_ID) {
    throw new Error("User have to be admin")
  }
  return user
}

export const fetchAdminProducts = async () => {
  await getAuthUser()
  const products = await db.product.findMany({ orderBy: { createdAt: "desc" } })
  return products
}

export const fetchProductsOnProductPage = async (search?: string) => {
  const keyword = search?.trim()

  const products = await db.product.findMany({
    where: keyword
      ? {
          OR: [
            { name: { contains: keyword } },
            { country: { contains: keyword } }
          ]
        }
      : undefined,
    orderBy: { createdAt: "desc" }
  })

  return products
}

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState
  await getAdminUser()

  try {
    const product = await db.product.delete({
      where: {
        id: productId
      }
    })

    await deleteImage(product.image)
    revalidatePath("/admin/products")
    return { message: "Product removed" }
  } catch (error) {
    return renderError(error)
  }
}

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; redirect?: string }> => {
  const admin = await getAdminUser()

  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get("image") as File

    const validatedFields = validateWithZodSchema(productSchema, rawData)
    const valifateFile = validateWithZodSchema(imageSchema, { image: file })

    const fullPath = await uploadImage(valifateFile.image)

    if (admin) {
      await db.product.create({
        data: {
          ...validatedFields,
          image: fullPath,
          clerkId: admin.id
        }
      })
    }

    return { message: "Product created", redirect: "/admin/products" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchAdminProductDetails = async (
  productId: string
): Promise<Product | null> => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId
      }
    })
    return product
  } catch (error) {
    renderError(error)
    return null
  }
}

export const fetchAllProducts = async () => {
  const products = await db.product.findMany({
    // orderBy: {
    //   createdAt: "asc"
    // }
  })
  return products
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser()

  try {
    const productId = formData.get("id") as string

    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(productSchema, rawData)

    await db.product.update({
      where: {
        id: productId
      },
      data: {
        ...validatedFields
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return {
      message: "Product updated successfully"
    }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser()
  try {
    const image = formData.get("image") as File
    const productId = formData.get("id") as string
    const oldImageUrl = formData.get("url") as string

    const validateFile = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validateFile.image)
    await deleteImage(oldImageUrl)
    await db.product.update({
      where: {
        id: productId
      },
      data: {
        image: fullPath
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: "Image updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productId: string) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        productId
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return reviews
  } catch (error) {
    renderError(error)
  }
}

export const fetchReviewsByClerkId = async (clerkId: string | null) => {
  if (!clerkId) {
    throw new Error("clerkId is require")
  }
  try {
    const reviews = await db.review.findMany({
      where: {
        clerkId
      },
      include: {
        product: true
      }
    })

    return reviews
  } catch (error) {
    renderError(error)
  }
}

export const findExistingReview = async (userId: string, productId: string) => {
  try {
    return db.review.findFirst({
      where: {
        clerkId: userId,
        productId
      }
    })
  } catch (error) {
    renderError(error)
  }
}

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id
      }
    })
    revalidatePath(`/products/${validatedFields.productId}`)
    return { message: "Review submitted successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductRating = async (productId: string) => {
  try {
    const result = await db.review.groupBy({
      by: ["productId"],
      _avg: {
        rating: true
      },
      _count: {
        rating: true
      },
      where: {
        productId
      }
    })

    return {
      rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
      count: result[0]?._count.rating ?? 0
    }
  } catch (error) {
    renderError(error)
  }
}

export const fetchOrCreateCart = async (clerkId: string) => {
  try {
    await getAuthUser()

    const cart = await db.cart.findFirst({
      where: { clerkId }
    })

    if (!cart) {
      await db.cart.create({
        data: {
          clerkId,
          taxRate: 10
        }
      })
    }

    if (cart) {
      return cart
    }
  } catch (error) {
    renderError(error)
  }
}

const updateOrCreateCartItems = async ({
  productId,
  cartId,
  amount
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  try {
    const cartItem = await db.cartItem.findFirst({
      where: {
        productId,
        cartId
      }
    })

    if (!cartItem) {
      await db.cartItem.create({
        data: {
          productId,
          cartId,
          amount
        }
      })
    }

    if (cartItem) {
      await db.cartItem.update({
        where: { id: cartItem.id },
        data: {
          amount: (cartItem.amount += amount)
        }
      })
    }
  } catch (error) {
    renderError(error)
  }
}

export const updateCart = async (cartId: string) => {
  try {
    const cartItems = await db.cartItem.findMany({
      where: { cartId },
      include: { product: true },
      orderBy: { createdAt: "asc" }
    })

    const cart = await await db.cart.findUnique({ where: { id: cartId } })

    if (!cart) {
      throw new Error("Cart  is required")
    }

    let numItemsInCart = 0
    let cartTotal = 0
    let tax = 0
    let orderTotal = 0

    for (const item of cartItems) {
      numItemsInCart += item.amount
      cartTotal += item.amount * item.product.price
      tax += (item.amount * item.product.price * cart.taxRate) / 100
      orderTotal = cartTotal + tax
    }

    if (cartItems) {
      const currentCart = await db.cart.update({
        where: { id: cartId },
        data: {
          numItemsInCart,
          cartTotal,
          tax,
          orderTotal
        }
      })

      return { cartItems, currentCart }
    }
  } catch (error) {
    renderError(error)
  }
}

export const addToCartAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; redirect?: string }> => {
  try {
    const user = await getAuthUser()
    const clerkId = user.id
    const rawData = { ...Object.fromEntries(formData), clerkId }
    const validatedFields = validateWithZodSchema(cartItemScheam, rawData)
    const { amount, productId } = validatedFields

    const cart = await fetchOrCreateCart(clerkId)
    if (cart) {
      await updateOrCreateCartItems({ productId, cartId: cart?.id, amount })
      await updateCart(cart.id)
      revalidatePath("/cart")
      return { message: "Already Added to cart", redirect: "/cart" }
    }

    return { message: "Error can't add to cart", redirect: "/cart" }
  } catch (error) {
    return renderError(error)
  }
}

export const updateAmountInCartItem = async ({
  amount,
  cartItemId
}: {
  amount: number
  cartItemId: string
}) => {
  try {
    const user = await getAuthUser()
    const cart = await fetchOrCreateCart(user.id)
    if (!cart) {
      throw new Error("Cart is required")
    }
    const result = await db.cartItem.update({
      where: { id: cartItemId },
      data: {
        amount
      }
    })
    await updateCart(cart.id)
    revalidatePath("/cart")
    return result
  } catch (error) {
    renderError(error)
  }
}

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; redirect?: string }> => {
  try {
    await getAuthUser()
    const cartItemId = formData.get("id")
    const cartId = formData.get("cartId")

    if (!cartItemId || typeof cartItemId !== "string") {
      throw new Error("Cart item id is required")
    }

    if (!cartId || typeof cartId !== "string") {
      throw new Error("Cart id is required")
    }
    await db.cartItem.delete({
      where: { id: cartItemId }
    })
    await updateCart(cartId)
    revalidatePath("/cart")
    return { message: "Item removed from cart" }
  } catch (error) {
    return renderError(error)
  }
}

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  let orderId: null | string = null
  let cartId: null | string = null

  try {
    const cart = await fetchOrCreateCart(user.id)

    if (!cart) {
      throw new Error("Cart id is require")
    }

    cartId = cart.id

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false
      }
    })

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        email: user.emailAddresses[0].emailAddress
      }
    })

    orderId = order.id
  } catch (error) {
    return renderError(error)
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const fetchUserOrders = async () => {
  const user = await getAuthUser()
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return orders
}

export const fetchAdminOrders = async () => {
  await getAdminUser()

  const orders = await db.order.findMany({
    where: {
      isPaid: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return orders
}

export const deleteReviewAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; redirect?: string }> => {
  try {
    const reviewId = formData.get("reviewId") as string
    const userId = formData.get("userId") as string
    const productId = formData.get("productId") as string
    const user = await getAuthUser()
    if (user.id !== userId) {
      throw new Error("User is incorrect")
    }
    await db.review.delete({ where: { id: reviewId } })
    // revalidatePath(`/product/${productId}`)
    if (!productId) {
      return { message: "Deleted review", redirect: `/my-reviews` }
    }
    return { message: "Deleted review", redirect: `/products/${productId}` }
  } catch (error) {
    const { message } = renderError(error)
    return { message }
  }
}

export const fetchFavorite = async ({
  userId,
  productId
}: {
  userId: string
  productId: string
}) => {
  try {
    const favorite = await db.favorite.findFirst({
      where: { clerkId: userId, productId }
    })
    if (favorite) {
      return favorite
    }
    if (!favorite) {
      return null
    }
  } catch (error) {
    renderError(error)
  }
}

export const addFavorite = async ({
  userId,
  productId
}: {
  userId: string
  productId: string
}) => {
  try {
    const result = await db.favorite.create({
      data: {
        clerkId: userId,
        productId
      }
    })
    return result
  } catch (error) {
    renderError(error)
  }
}

export const deleteFavorite = async ({
  favoriteId,
  pathname
}: {
  favoriteId: string
  pathname?: string
}) => {
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: { id: favoriteId }
      })
      if (pathname) {
        revalidatePath(pathname)
      }

      return "Deleted favorite"
    }
  } catch (error) {
    renderError(error)
  }
}

export const fetchFavoriteProductByUserId = async (clerkId: string) => {
  try {
    await getAuthUser()
    const products = db.favorite.findMany({
      where: {
        clerkId
      },
      include: {
        product: true
      }
    })
    return products
  } catch (error) {
    renderError(error)
  }
}

export const fetchCartItems = async (cartId: string) => {
  try {
    const res = await db.cartItem.findMany({
      where: {
        cartId
      }
    })
    return res
  } catch (error) {
    renderError(error)
  }
}

export const fetchOrderItems = async (orderId: string) => {
  try {
    const orderItems = await db.orderItem.findMany({
      where: { orderId },
      include: { product: true }
    })
    return orderItems
  } catch (error) {}
}

// export const deleteProductAction = async (prevState: { productId: string }) => {
//   const { productId } = prevState
//   await getAdminUser()

//   try {
//     const product = await db.product.delete({
//       where: {
//         id: productId
//       }
//     })

//     await deleteImage(product.image)
//     revalidatePath("/admin/products")
//     return { message: "Product removed" }
//   } catch (error) {
//     return renderError(error)
//   }
// }

export const deleteOrderAction = async (prevState: {
  orderId: string
}): Promise<{ message: string }> => {
  const { orderId } = prevState
  await getAdminUser()
  try {
    await db.order.delete({
      where: { id: orderId }
    })
    revalidatePath("/admin/sales")
    return { message: "deleted order" }
  } catch (error) {
    renderError(error)
    return { message: "Delete error" }
  }
}
