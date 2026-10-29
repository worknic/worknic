import { requireAdmin } from "../../lib/admin-auth.js";

function cfg() {
  const url = process.env.WORKNIC_NAVER_RELAY_URL;
  const token = process.env.WORKNIC_RELAY_TOKEN || process.env.WORKNIC_ADMIN_TOKEN;
  if (!url || !token) throw new Error("Relay not configured");
  return { url: url.replace(/\/$/, ""), token };
}

async function relay(path, options={}) {
  const {url, token} = cfg();
  const r = await fetch(url + path, {
    ...options,
    headers:{
      "Authorization":"Bearer " + token,
      "Accept":"application/json",
      "Content-Type":"application/json",
      ...(options.headers||{})
    }
  });
  const data = await r.json().catch(()=>({}));
  return {status:r.status, data};
}

export default async function handler(req,res){
  if (!requireAdmin(req,res)) return;
  const type = String(req.query?.type || "");
  try {
    if (type === "products") {
      const page = Number(req.query.page || 1);
      const size = Math.min(Number(req.query.size || 100), 500);
      const out = await relay("/products/search",{
        method:"POST",
        body:JSON.stringify({page,size,orderType:"REG_DATE",orderDirection:"ASC"})
      });
      return res.status(out.status).json(out.data);
    }
    return res.status(400).json({error:"Unsupported audit type"});
  } catch(e) {
    return res.status(500).json({error:e.message});
  }
}
