// -----------------------------
// npx prisma db seed で実行
// -----------------------------

try {
  await import("./user.mjs");
} catch (err) {
  throw err;
}
