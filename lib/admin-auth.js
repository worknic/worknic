export function requireAdmin(req, res) {
  const expected = process.env.WORKNIC_ADMIN_TOKEN;

  if (!expected) {
    res.status(503).json({ error: "WORKNIC_ADMIN_TOKEN is not configured" });
    return false;
  }

  const auth = req.headers?.authorization || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const headerToken = req.headers?.["x-worknic-admin-token"] || "";
  const provided = bearer || headerToken;

  if (!provided || provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }

  return true;
}
