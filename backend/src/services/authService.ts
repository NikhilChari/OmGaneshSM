import bcrypt from 'bcryptjs'
import pool from '../config/database'
import type { RowDataPacket } from 'mysql2'

interface AdminRow extends RowDataPacket {
  id: number
  name: string
  email: string
  password_hash: string
}

export async function findAdminByEmail(email: string) {
  const [rows] = await pool.execute<AdminRow[]>(
    `
      SELECT
        id,
        name,
        email,
        password_hash
      FROM admins
      WHERE email = ?
      LIMIT 1
    `,
    [email],
  )

  return rows[0] || null
}

export async function verifyAdminPassword(
  password: string,
  passwordHash: string,
) {
  return bcrypt.compare(password, passwordHash)
}