import { getPool } from "../../library/db";

export default async function handler(_req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch schools" });
  }
}
