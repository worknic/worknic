import { naverCommerce } from "../../lib/naver-commerce.js";
import { requireAdmin } from "../../lib/admin-auth.js";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await naverCommerce.searchProducts(req.body || {});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
      details: error.payload || null
    });
  }
}
