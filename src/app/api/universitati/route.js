import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";

export const GET = async (req) => {
    const pool = getPool();

    try {
        const { rows, fields } = await pool.query('SELECT * FROM universitati');
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.error({ message: 'Internal server error' });
    }
}

