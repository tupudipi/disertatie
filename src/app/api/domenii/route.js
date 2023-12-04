// // pages/api/domenii.js
// import getPool from '../../../lib/db';

// export default async function handler(req, res) {
//   const pool = getPool();

//   try {
//     console.log("Request received for /api/domenii");
//     const result = await pool.query('SELECT * FROM domeniistudiu');
//     console.log("Query result:", result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error in /api/domenii:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   } 
// }

import getPool from '../../../lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const pool = getPool();

  try {
    //console.log("Request received for /api/domenii");
    const result = await pool.query('SELECT * FROM domeniistudiu');
    //console.log("Query result:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    //console.error("Error in /api/domenii:", error);
    return NextResponse.error({ message: 'Internal server error' });
  }
}
