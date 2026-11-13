// news-image-01 entry R3 — "The World, Friday 13 November 2026 (Nineteen Stories)".
// Stdlib-only copy program: validates the composed front page, then copies it
// to the grader's output directory. Run: MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "entry.png");
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const DEST = join(OUT_DIR, "entry.png");
const MAX_BYTES = 1_048_576;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(msg: string): never {
  console.error(`gate failed: ${msg}`);
  process.exit(1);
}

const bytes = readFileSync(SOURCE);
if (bytes.length > MAX_BYTES) {
  fail(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  fail("entry.png is not a PNG (bad magic bytes)");
}
// IHDR width/height are big-endian uint32 at offsets 16 and 20.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  fail(`entry.png is ${width}x${height}, expected 1024x1024`);
}

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SOURCE, DEST);

// Round-trip guardrail: re-parse what was just written as a PNG of the
// expected size, and confirm it is byte-identical to the source.
const written = readFileSync(DEST);
if (!written.subarray(0, 8).equals(PNG_MAGIC)) {
  fail("output is not a PNG (bad magic bytes after copy)");
}
if (written.readUInt32BE(16) !== 1024 || written.readUInt32BE(20) !== 1024) {
  fail("output is not 1024x1024 after copy");
}
const digest = createHash("sha256").update(bytes).digest("hex");
const writtenDigest = createHash("sha256").update(written).digest("hex");
if (writtenDigest !== digest) {
  fail("output bytes differ from entry.png after copy");
}
console.log(`wrote ${DEST} (${bytes.length} bytes, sha256 ${digest})`);
