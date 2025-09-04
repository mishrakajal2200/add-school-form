import path from "path";
import fs from "fs";
import multer from "multer";
import { getPool } from "../../library/db";


const uploadDir = path.join(process.cwd(), "public", "schoolImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (_req, file, cb) => {
    
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});


function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
}

export const config = {
  api: { bodyParser: false }, 
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    await runMiddleware(req, res, upload.single("image"));

    const { name, address, city, state, contact, email_id } = req.body;
    const imageFile = req.file?.filename || null;

    
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pool = getPool();
    await pool.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imageFile, email_id]
    );

    return res.status(200).json({ message: "School added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Upload failed" });
  }
}
