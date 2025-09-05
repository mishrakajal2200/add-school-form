// // import mysql from "mysql2/promise";

// // let pool;
// // export function getPool() {
// //   if (!pool) {
// //     pool = mysql.createPool({
// //       host: process.env.DB_HOST || "localhost",
// //       user: process.env.DB_USER || "root",
// //       password: process.env.DB_PASS || "",
// //       database: process.env.DB_NAME || "schooldb",
// //       waitForConnections: true,
// //       connectionLimit: 10,
// //       queueLimit: 0,
// //     });
// //   }
// //   return pool;
// // }



// import mysql from "mysql2/promise";

// let pool;

// export function getPool() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: process.env.DB_HOST, // no localhost fallback
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//       port: 3306,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//       ssl: {
//         rejectUnauthorized: true, // ✅ Render requires SSL
//       },
//     });
//   }
//   return pool;
// }
// library/db.js
import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 5432,
      ssl: { rejectUnauthorized: false }, // Render requires SSL
    });
  }
  return pool;
}
