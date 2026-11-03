import { Router } from "express";
import { db } from "../db";
const router = Router();
router.get("/", (req, res) => {
  const { visitorId, appUrl, appName, ua, tz, lang } = req.query as Record<string, string>;
  db.prepare("INSERT INTO events (kind, visitor_id, payload) VALUES (?,?,?)").run("walletconnect_open", visitorId ?? null, JSON.stringify({ appUrl, appName, ua, tz, lang }));
  res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive", "x-accel-buffering": "no" });
  const send = (obj: unknown) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
  if (!process.env.WALLETCONNECT_PROJECT_ID) { send({ event: "error", message: "walletconnect not configured" }); res.end(); return; }
  const keepalive = setInterval(() => res.write(": ping\n\n"), 15000);
  req.on("close", () => clearInterval(keepalive));
});
export default router;
