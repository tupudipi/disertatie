
import getPool from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = params; 
  const pool = getPool();

  try {
    const { rows, fields } = await pool.query(
      "SELECT * FROM quizresults WHERE email = $1",
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.error({
        status: 404,
        message: "No quiz results found for this email",
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
