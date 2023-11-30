import getPool from "@/lib/db";
import { NextResponse } from "next/server";

const handleDatabaseError = (error) => {
  console.error("Database error:", error);
  return NextResponse.error({
    status: 500,
    message: "Internal server error",
  });
};

export const POST = async (request) => {
  const pool = getPool();
  const req = await request.json();

  try {
    const { email, domain, branches } = req;

    const result = await pool.query(
      "INSERT INTO quizresults (email, domain, branches) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET domain = $2, branches = $3 RETURNING *",
      [email, domain, branches]
    );

    // Process the result as needed
    const insertedOrUpdateData = result.rows[0];

    return NextResponse.json({
      status: 200,
      body: insertedOrUpdateData,
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
};
