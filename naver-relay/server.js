import express from "express";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 8787;
const BASE_URL = "https://api.commerce.naver.com/external";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function requireAdmin(req, res, next) {
  const expected = required("WORKNIC_RELAY_TOKEN");
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function createClientSecretSign(clientId, clientSecret, timestamp) {
  const password = `${clientId}_${timestamp}`;
  const hashed = bcrypt.hashSync(password, clientSecret);
  return Buffer.from(hashed, "utf8").toString("base64");
}

async function issueAccessToken() {
  const clientId = required("NAVER_COMMERCE_CLIENT_ID");
  const clientSecret = required("NAVER_COMMERCE_CLIENT_SECRET");
  const timestamp = Date.now();

  const body = new URLSearchParams({
    client_id: clientId,
    timestamp: String(timestamp),
    grant_type: "client_credentials",
    client_secret_sign: createClientSecretSign(clientId, clientSecret, timestamp),
    type: "SELF"
  });

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.message || "Failed to issue access token");
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data.access_token;
}

async function naverRequest(path, options = {}) {
  const token = await issueAccessToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json;charset=UTF-8",
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.message || `Naver API error (${response.status})`);
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "worknic-naver-relay",
    configured: Boolean(
      process.env.NAVER_COMMERCE_CLIENT_ID &&
      process.env.NAVER_COMMERCE_CLIENT_SECRET &&
      process.env.WORKNIC_RELAY_TOKEN
    )
  });
});

app.use(requireAdmin);

app.post("/products/search", async (req, res) => {
  try {
    const data = await naverRequest("/v1/products/search", {
      method: "POST",
      body: JSON.stringify(req.body || {})
    });
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message,
      details: error.payload || null
    });
  }
});

app.get("/products/:originProductNo", async (req, res) => {
  try {
    const data = await naverRequest(
      `/v2/products/origin-products/${encodeURIComponent(req.params.originProductNo)}`,
      { method: "GET" }
    );
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message,
      details: error.payload || null
    });
  }
});

app.put("/products/:originProductNo", async (req, res) => {
  const { confirm, payload } = req.body || {};

  if (confirm !== true) {
    return res.json({
      dryRun: true,
      originProductNo: req.params.originProductNo,
      message: "No changes were sent to Naver.",
      payload
    });
  }

  if (!payload?.originProduct) {
    return res.status(400).json({ error: "payload.originProduct is required" });
  }

  try {
    const data = await naverRequest(
      `/v2/products/origin-products/${encodeURIComponent(req.params.originProductNo)}`,
      {
        method: "PUT",
        body: JSON.stringify(payload)
      }
    );
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message,
      details: error.payload || null
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`WORKNIC Naver relay listening on port ${PORT}`);
});
