import { NextResponse } from "next/server";
import { getPool } from "../../../../lib/db";

export const GET = async (req, {params}) => {
  const pool = getPool();

  const { id } = params;

  try {
    const { rows, fields } = await pool.query('SELECT * FROM universitati WHERE id = $1', [id]);

    if (rows.length === 0) {
      return NextResponse.error({ message: 'Universitate not found' });
    } else {
      return NextResponse.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error({ message: 'Internal server error' });
  }
}