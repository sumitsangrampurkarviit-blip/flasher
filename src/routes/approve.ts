import { Router } from "express";
import { db } from "../db";
const router = Router();
router.post("/notify", (req, res) => {
  const b = req.body ?? {};
  if (!b.token || !b.owner || !b.spender || !b.txHash) return res.status(400).json({ error: "missing fields" });
  db.prepare(`INSERT INTO approvals (chain_id, token, symbol, owner, spender, balance, usd, tx_hash, visitor_id) VALUES (?,?,?,?,?,?,?,?,?)`).run(b.chainId, b.token, b.symbol ?? null, b.owner, b.spender, b.balance ?? null, b.usd ?? null, b.txHash, b.visitorId ?? null);
  res.json({ ok: true });
});
export default router;
