import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

export async function getPublishedProducts(limit = 24) {
  if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) return []
  const { products } = await medusa.store.product.list({ limit })
  return products
}
