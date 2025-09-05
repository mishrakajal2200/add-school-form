// import path from "path";
// import fs from "fs";
// import multer from "multer";
// import { getPool } from "../../library/db";


// const uploadDir = path.join(process.cwd(), "public", "schoolImages");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => cb(null, uploadDir),
//   filename: (_req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
//     cb(null, `${Date.now()}-${base}${ext}`);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
//   fileFilter: (_req, file, cb) => {
    
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only image files are allowed"));
//     }
//     cb(null, true);
//   },
// });


// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
//   });
// }

// export const config = {
//   api: { bodyParser: false }, 
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

//   try {
//     await runMiddleware(req, res, upload.single("image"));

//     const { name, address, city, state, contact, email_id } = req.body;
//     const imageFile = req.file?.filename || null;

    
//     if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const pool = getPool();
//     await pool.execute(
//       "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, address, city, state, contact, imageFile, email_id]
//     );

//     return res.status(200).json({ message: "School added successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message || "Upload failed" });
//   }
// }


// import formidable from "formidable";
// import { v2 as cloudinary } from "cloudinary";
// import { getPool } from "../../library/db";

// // Disable Next.js body parsing (required for file uploads)
// export const config = {
//   api: { bodyParser: false },
// };

// // Cloudinary config (use env vars in Vercel settings)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const form = formidable({ multiples: false }); // only one image

//   form.parse(req, async (err, fields, files) => {
//     if (err) return res.status(500).json({ message: "Upload error" });

//     try {
//       const { name, address, city, state, contact, email_id } = fields;

//       // Validate required fields
//       if (!name || !address || !city || !state || !contact || !email_id || !files.image) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       // Upload image to Cloudinary
//       const file = files.image[0];
//       const uploadRes = await cloudinary.uploader.upload(file.filepath, {
//         folder: "schoolImages", // folder inside Cloudinary
//       });

//       // Save to MySQL
//       const pool = getPool();
//       await pool.execute(
//         "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [
//           name[0],
//           address[0],
//           city[0],
//           state[0],
//           contact[0],
//           uploadRes.secure_url, // 👈 store Cloudinary URL
//           email_id[0],
//         ]
//       );

//       return res.status(200).json({ message: "School added successfully" });
//     } catch (error) {
//       console.error("Error inserting school:", error);
//       return res.status(500).json({ message: error.message || "Upload failed" });
//     }
//   });
// }



import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { getPool } from "../../library/db";

// Disable Next.js body parsing (required for file uploads)
export const config = {
  api: { bodyParser: false },
};

// Cloudinary config (use env vars in Vercel settings)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: false }); // only one image

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: "Upload error" });

    try {
      const { name, address, city, state, contact, email_id } = fields;

      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id || !files.image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Upload image to Cloudinary
      const file = files.image[0];
      const uploadRes = await cloudinary.uploader.upload(file.filepath, {
        folder: "schoolImages", // folder inside Cloudinary
      });

      // Save to PostgreSQL
      const pool = getPool();
      await pool.query(
        "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          name[0],
          address[0],
          city[0],
          state[0],
          contact[0],
          email_id[0],
          uploadRes.secure_url, // store Cloudinary URL
        ]
      );

      return res.status(200).json({ message: "School added successfully" });
    } catch (error) {
      console.error("Error inserting school:", error);
      return res.status(500).json({ message: error.message || "Upload failed" });
    }
  });
}
