import { medusa } from "./medusa"
import { products as fallback, type WorknicProduct } from "./products"

export async function catalog(): Promise<WorknicProduct[]> {
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (!key) return fallback
  try {
    const { products } = await medusa.store.product.list({ limit: 100 })
    if (!products.length) return fallback
    return products.map((p: any) => {
      const v = p.variants?.[0]
      const m = p.metadata || {}
      return {
        slug: p.handle || p.id,
        brand: String(m.brand || "WORKNIC"),
        name: p.title,
        model: String(m.manufacturer_model || v?.sku || ""),
        price: Number(v?.calculated_price?.calculated_amount || 0),
        section: (m.worknic_section || "TOOLS") as WorknicProduct["section"],
        pickup: "STATION 수령 대상",
      }
    })
  } catch {
    return fallback
  }
}
