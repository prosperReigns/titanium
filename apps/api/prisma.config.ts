import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const envPath = fileURLToPath(new URL("./.env", import.meta.url));

process.loadEnvFile(envPath);

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL was not loaded from ${envPath}`);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
