import bcrypt from "bcryptjs";

const BASE_URL = "https://api.commerce.naver.com/external";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function createClientSecretSign(clientId, clientSecret, timestamp) {
  const password = `${clientId}_${timestamp}`;
  const hashed = bcrypt.hashSync(password, clientSecret);
  return Buffer.from(hashed, "utf8").toString("base64");
}

async function issueAccessToken() {
  const clientId = required("NAVER_COMMERCE_CLIENT_ID");
  const clientSecret = required("NAVER_COMMERCE_CLIENT_SECRET");
  const accountId = required("NAVER_COMMERCE_ACCOUNT_ID");
  const timestamp = Date.now();

  const body = new URLSearchParams({
    client_id: clientId,
    timestamp: String(timestamp),
    grant_type: "client_credentials",
    client_secret_sign: createClientSecretSign(clientId, clientSecret, timestamp),
    type: "SELLER",
    account_id: accountId
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
    const err = new Error(data?.message || "Failed to issue Naver Commerce access token");
    err.status = response.status;
    err.payload = data;
    throw err;
  }

  return data.access_token;
}

async function request(path, options = {}, retry = true) {
  const accessToken = await issueAccessToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Accept": "application/json;charset=UTF-8",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (
    retry &&
    response.status === 401 &&
    data?.code === "GW.AUTHN"
  ) {
    return request(path, options, false);
  }

  if (!response.ok) {
    const err = new Error(data?.message || `Naver Commerce API error (${response.status})`);
    err.status = response.status;
    err.payload = data;
    throw err;
  }

  return data;
}

export const naverCommerce = {
  health() {
    return {
      configured: Boolean(
        process.env.NAVER_COMMERCE_CLIENT_ID &&
        process.env.NAVER_COMMERCE_CLIENT_SECRET &&
        process.env.NAVER_COMMERCE_ACCOUNT_ID
      )
    };
  },

  searchProducts(body = {}) {
    return request("/v1/products/search", {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  getOriginProduct(originProductNo) {
    return request(`/v2/products/origin-products/${encodeURIComponent(originProductNo)}`, {
      method: "GET"
    });
  },

  updateOriginProduct(originProductNo, body) {
    return request(`/v2/products/origin-products/${encodeURIComponent(originProductNo)}`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  }
};
