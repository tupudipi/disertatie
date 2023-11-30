import getPool from '../../../lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const pool = getPool();

  try {
    const { rows, fields } = await pool.query('SELECT * FROM specializari');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error({ message: 'Internal server error' });
  }
}