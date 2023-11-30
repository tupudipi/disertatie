import getPool from '../../../lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const pool = getPool();
  const { rows, fields } = await pool.query('SELECT * FROM rezultatesearch');
  return NextResponse.json(rows);
}