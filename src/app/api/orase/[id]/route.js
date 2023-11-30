// // pages/api/orase/[id].js

// import getPool from '../../../lib/db';

// export default async function handler(req, res) {
//   const pool = getPool();

//   const { id } = req.query;

//   try {
//     const {rows, fields} = await pool.query('SELECT * FROM orase WHERE id = $1', [id]);

//     if (rows.length === 0) {
//       res.status(404).json({ message: 'Oras not found' });
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   } 
// }

import getPool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    const pool = getPool();

    const { id } = params;

    try {
        const { rows, fields } = await pool.query('SELECT * FROM orase WHERE id = $1', [id]);

        if (rows.length === 0) {
            return NextResponse.error({ message: 'Oras not found' });
        } else {
            return NextResponse.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error({ message: 'Internal server error' });
    }
}