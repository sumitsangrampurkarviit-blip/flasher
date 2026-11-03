import { Router } from "express";
const router = Router();
const RPC_URLS: Record<string, string> = JSON.parse(process.env.RPC_URLS ?? "{}");
const NATIVE: Record<string, string> = { "1": "ETH", "56": "BNB", "137": "MATIC", "42161": "ETH", "8453": "ETH", "10": "ETH" };
async function rpc(url: string, method: string, params: unknown[]) {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) });
  const j: any = await r.json();
  if (j.error) throw new Error(j.error.message);
  return j.result;
}
router.get("/:address", async (req, res) => {
  const address = req.params.address;
  const byChain: any[] = [];
  for (const [chainId, url] of Object.entries(RPC_URLS)) {
    try {
      const hex = await rpc(url, "eth_getBalance", [address, "latest"]);
      const wei = BigInt(hex);
      if (wei === 0n) continue;
      byChain.push({ chainId: Number(chainId), native: { symbol: NATIVE[chainId] ?? "NATIVE", amount: (Number(wei) / 1e18).toFixed(6), usd: 0 } });
    } catch {}
  }
  res.json({ address, byChain });
});
export default router;
