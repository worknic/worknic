import { requireAdmin } from "../../lib/admin-auth.js";

function relayConfig() {
  const url = process.env.WORKNIC_NAVER_RELAY_URL;
  const token = process.env.WORKNIC_RELAY_TOKEN;
  if (!url || !token) throw new Error("WORKNIC relay is not configured");
  return { url: url.replace(/\/$/, ""), token };
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const originProductNo = req.query?.originProductNo;
  if (!originProductNo) {
    return res.status(400).json({ error: "originProductNo is required" });
  }

  try {
    const { url, token } = relayConfig();
    const target = `${url}/products/${encodeURIComponent(originProductNo)}`;

    if (req.method === "GET") {
      const response = await fetch(target, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await response.json().catch(() => ({}));
      return res.status(response.status).json(data);
    }

    if (req.method === "PUT") {
      const response = await fetch(target, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(req.body || {})
      });
      const data = await response.json().catch(() => ({}));
      return res.status(response.status).json(data);
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
