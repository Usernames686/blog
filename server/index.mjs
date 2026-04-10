import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8318);
const jwtSecret = process.env.JWT_SECRET || "replace-me-in-production";
const adminEmail = process.env.ADMIN_EMAIL || "admin@system.local";
const adminPassword = process.env.ADMIN_PASSWORD || "123456";
const adminAccount = process.env.ADMIN_ACCOUNT || "admin";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));

function mapArticle(row) {
  return {
    id: row.id,
    title: row.title,
    date: row.date || "",
    intro: row.intro || "",
    content: row.content || "",
    quote: row.quote || "",
    coverImage: row.coverImage || "",
    contentImages: Array.isArray(row.contentImages) ? row.contentImages : [],
    authorId: row.authorId,
    createdAt: row.createdAt,
  };
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function ensureAdminUser() {
  const hashed = await bcrypt.hash(adminPassword, 12);
  await pool.query(
    `
    INSERT INTO users(email, password_hash, role)
    VALUES ($1, $2, 'admin')
    ON CONFLICT (email) DO NOTHING
    `,
    [adminEmail, hashed],
  );
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/login", async (req, res) => {
  const { account, password } = req.body || {};
  if (!account || !password) {
    return res.status(400).json({ message: "Account and password are required" });
  }

  const email = account === adminAccount ? adminEmail : account;
  const { rows } = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1 LIMIT 1",
    [email],
  );
  const user = rows[0];
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: "7d" },
  );

  return res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

app.get("/api/auth/me", authRequired, async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, email, role FROM users WHERE id = $1 LIMIT 1",
    [req.user.sub],
  );
  if (!rows[0]) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(rows[0]);
});

app.get("/api/articles", async (_req, res) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      title,
      date,
      intro,
      content,
      quote,
      cover_image AS "coverImage",
      content_images AS "contentImages",
      author_id AS "authorId",
      created_at AS "createdAt"
    FROM articles
    ORDER BY created_at DESC
    `,
  );

  return res.json(rows.map(mapArticle));
});

app.post("/api/articles", authRequired, async (req, res) => {
  const body = req.body || {};
  if (!body.title || !String(body.title).trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const contentImages = Array.isArray(body.contentImages) ? body.contentImages.slice(0, 10) : [];
  const { rows } = await pool.query(
    `
    INSERT INTO articles(
      title, date, intro, content, quote, cover_image, content_images, author_id
    )
    VALUES($1,$2,$3,$4,$5,$6,$7::jsonb,$8)
    RETURNING
      id,
      title,
      date,
      intro,
      content,
      quote,
      cover_image AS "coverImage",
      content_images AS "contentImages",
      author_id AS "authorId",
      created_at AS "createdAt"
    `,
    [
      String(body.title),
      body.date || "",
      body.intro || "",
      body.content || "",
      body.quote || "",
      body.coverImage || "",
      JSON.stringify(contentImages),
      req.user.sub,
    ],
  );

  return res.status(201).json(mapArticle(rows[0]));
});

app.patch("/api/articles/:id", authRequired, async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  if (!body.title || !String(body.title).trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const contentImages = Array.isArray(body.contentImages) ? body.contentImages.slice(0, 10) : [];
  const { rows } = await pool.query(
    `
    UPDATE articles
    SET
      title = $1,
      date = $2,
      intro = $3,
      content = $4,
      quote = $5,
      cover_image = $6,
      content_images = $7::jsonb,
      updated_at = now()
    WHERE id = $8
    RETURNING
      id,
      title,
      date,
      intro,
      content,
      quote,
      cover_image AS "coverImage",
      content_images AS "contentImages",
      author_id AS "authorId",
      created_at AS "createdAt"
    `,
    [
      String(body.title),
      body.date || "",
      body.intro || "",
      body.content || "",
      body.quote || "",
      body.coverImage || "",
      JSON.stringify(contentImages),
      id,
    ],
  );

  if (!rows[0]) {
    return res.status(404).json({ message: "Article not found" });
  }
  return res.json(mapArticle(rows[0]));
});

app.delete("/api/articles/:id", authRequired, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM articles WHERE id = $1", [id]);
  if (!result.rowCount) {
    return res.status(404).json({ message: "Article not found" });
  }
  return res.status(204).send();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

app.use(express.static(distDir));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(distDir, "index.html"));
});

async function start() {
  await ensureAdminUser();
  app.listen(port, "0.0.0.0", () => {
    console.log(`API listening on :${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start API", err);
  process.exit(1);
});
