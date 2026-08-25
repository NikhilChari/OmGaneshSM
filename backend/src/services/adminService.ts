import bcrypt from 'bcryptjs'
import pool from '../config/database'
import type {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2'

export interface AdminProfile extends RowDataPacket {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface AdminWithPassword extends AdminProfile {
  password_hash: string
}

export async function getAdminById(
  adminId: number,
) {
  const [rows] = await pool.execute<AdminProfile[]>(
    `
      SELECT
        id,
        name,
        email,
        created_at,
        updated_at
      FROM admins
      WHERE id = ?
      LIMIT 1
    `,
    [adminId],
  )

  return rows[0] || null
}

export async function getAdminByIdWithPassword(
  adminId: number,
) {
  const [rows] = await pool.execute<AdminWithPassword[]>(
    `
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at,
        updated_at
      FROM admins
      WHERE id = ?
      LIMIT 1
    `,
    [adminId],
  )

  return rows[0] || null
}

export async function emailBelongsToAnotherAdmin(
  email: string,
  adminId: number,
) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id
      FROM admins
      WHERE email = ?
        AND id != ?
      LIMIT 1
    `,
    [email, adminId],
  )

  return rows.length > 0
}

export async function updateAdminProfile(
  adminId: number,
  name: string,
  email: string,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      UPDATE admins
      SET
        name = ?,
        email = ?
      WHERE id = ?
    `,
    [name, email, adminId],
  )

  return result
}

export async function updateAdminPassword(
  adminId: number,
  newPassword: string,
) {
  const passwordHash = await bcrypt.hash(
    newPassword,
    12,
  )

  const [result] = await pool.execute<ResultSetHeader>(
    `
      UPDATE admins
      SET
        password_hash = ?
      WHERE id = ?
    `,
    [passwordHash, adminId],
  )

  return result
}

export async function verifyCurrentAdminPassword(
  adminId: number,
  currentPassword: string,
) {
  const admin =
    await getAdminByIdWithPassword(adminId)

  if (!admin) {
    return false
  }

  return bcrypt.compare(
    currentPassword,
    admin.password_hash,
  )
}