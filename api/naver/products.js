import { requireAdmin } from "../../lib/admin-auth.js";

function relayConfig() {
  const url = process.env.WORKNIC_NAVER_RELAY_URL;
  const token = process.env.WORKNIC_RELAY_TOKEN;
  if (!url || !token) throw new Error("WORKNIC relay is not configured");
  return { url: url.replace(/\/$/, ""), token };
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, token } = relayConfig();
    const response = await fetch(`${url}/products/search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(req.body || {})
    });

    const data = await response.json().catch(() => ({}));
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
