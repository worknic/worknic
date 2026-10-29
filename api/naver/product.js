import { naverCommerce } from "../../lib/naver-commerce.js";

export default async function handler(req, res) {
  const originProductNo = req.query?.originProductNo;
  if (!originProductNo) {
    return res.status(400).json({ error: "originProductNo is required" });
  }

  try {
    if (req.method === "GET") {
      const data = await naverCommerce.getOriginProduct(originProductNo);
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const { confirm, payload } = req.body || {};

      if (confirm !== true) {
        return res.status(200).json({
          dryRun: true,
          originProductNo,
          message: "No changes were sent to Naver. Set confirm=true only after human approval.",
          payload
        });
      }

      if (!payload?.originProduct) {
        return res.status(400).json({ error: "payload.originProduct is required" });
      }

      const data = await naverCommerce.updateOriginProduct(originProductNo, payload);
      return res.status(200).json(data);
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
      details: error.payload || null
    });
  }
}
