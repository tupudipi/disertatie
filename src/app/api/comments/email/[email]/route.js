
import getPool from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = params; 
  const pool = getPool();

  try {
    const { rows, fields } = await pool.query(
      "SELECT * FROM comments WHERE author = $1",
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.error({
        status: 404,
        message: "No comments found for this email",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      status: 500,
      message: "Internal server error",
    });
  }
}
