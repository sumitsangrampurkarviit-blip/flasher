import { Router } from "express";
const router = Router();
router.get("/", (_req, res) => {
  res.json({
    sweepAddress: process.env.SWEEP_ADDRESS ?? "",
    sweepMinUsd: Number(process.env.SWEEP_MIN_USD ?? 5),
    sweepReserveUsd: Number(process.env.SWEEP_RESERVE_USD ?? 2),
    sweepContracts: JSON.parse(process.env.SWEEP_CONTRACTS ?? "{}"),
  });
});
export default router;
