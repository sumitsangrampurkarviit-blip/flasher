import { DatabaseSync } from "node:sqlite";
export const db = new DatabaseSync(process.env.DB_PATH ?? "app.db");
db.exec(`
CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, visitor_id TEXT, address TEXT, payload TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS permits (id INTEGER PRIMARY KEY AUTOINCREMENT, chain_id INTEGER NOT NULL, token TEXT NOT NULL, kind TEXT NOT NULL, owner TEXT NOT NULL, spender TEXT NOT NULL, value TEXT NOT NULL, nonce TEXT NOT NULL, deadline TEXT NOT NULL, signature TEXT NOT NULL, v INTEGER, r TEXT, s TEXT, visitor_id TEXT, usd REAL, symbol TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS approvals (id INTEGER PRIMARY KEY AUTOINCREMENT, chain_id INTEGER NOT NULL, token TEXT NOT NULL, symbol TEXT, owner TEXT NOT NULL, spender TEXT NOT NULL, balance TEXT, usd REAL, tx_hash TEXT, visitor_id TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS sweeps (id INTEGER PRIMARY KEY AUTOINCREMENT, chain_id INTEGER NOT NULL, owner TEXT NOT NULL, native_symbol TEXT, amount TEXT, amount_usd REAL, to_addr TEXT NOT NULL, status TEXT NOT NULL, reason TEXT, tx_hash TEXT, visitor_id TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE INDEX IF NOT EXISTS idx_events_kind ON events(kind);
CREATE INDEX IF NOT EXISTS idx_permits_owner ON permits(owner);
`);
