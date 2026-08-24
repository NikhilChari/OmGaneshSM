import pool from '../config/database'
import type { ResultSetHeader } from 'mysql2'

export interface CreateMembershipInput {
  full_name: string
  email?: string
  phone: string
  address?: string
  message?: string
}

export async function createMembership(
  data: CreateMembershipInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO memberships
        (full_name, email, phone, address, message)
      VALUES
        (?, ?, ?, ?, ?)
    `,
    [
      data.full_name,
      data.email || null,
      data.phone,
      data.address || null,
      data.message || null,
    ],
  )

  return result
}