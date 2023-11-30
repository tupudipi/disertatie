
import getPool from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = params; // Get email from params instead of useRouter

  const pool = getPool();

  try {
    // Fetch quiz results for the specified email
    const { rows, fields } = await pool.query(
      "SELECT * FROM quizresults WHERE email = $1",
      [email]
    );

    // If rows were returned, send them back in response
    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      // Otherwise, send back a 404 status
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
