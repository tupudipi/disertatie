import getPool from '../../../../src/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const pool = getPool();

  try {
    const { rows, fields } = await pool.query('SELECT * FROM comments');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error({ status: 500, message: 'Internal server error' });
  }
}

export const POST = async (request) => {
  const pool = getPool();
  const req = await request.json();

  // Parse JSON body
  const { pageId, author, content, parent_id = 0 } = req;

  try {
    const now = new Date();
    const result = await pool.query(
      'INSERT INTO comments (page_id, parent_id, author, content, status, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [pageId, parent_id, author, content, 'Approved', now]
    );
    
    // Get the newly inserted comment
    const newComment = result.rows[0];
    
    // Return the newly inserted comment
    return NextResponse.json(newComment);

  } catch (error) {
    console.error('Error in POST method:', error.message);
    return NextResponse.error({ status: 500, message: 'Internal server error' });
  }
}