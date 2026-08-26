import pool from '../config/database'

import type {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2'

export interface CreateTeamMemberInput {
  name: string
  role: string
  description?: string
  image_url?: string
  sort_order?: number
  status?: 'active' | 'inactive'
}

export interface UpdateTeamMemberInput {
  name: string
  role: string
  description?: string
  image_url?: string
  sort_order?: number
  status?: 'active' | 'inactive'
}

export async function getActiveTeamMembers() {
  const [rows] =
    await pool.execute<RowDataPacket[]>(
      `
        SELECT
          id,
          name,
          role,
          description,
          image_url,
          sort_order,
          status,
          created_at,
          updated_at
        FROM team_members
        WHERE status = 'active'
        ORDER BY sort_order ASC, id ASC
      `,
    )

  return rows
}

export async function getAllTeamMembers() {
  const [rows] =
    await pool.execute<RowDataPacket[]>(
      `
        SELECT
          id,
          name,
          role,
          description,
          image_url,
          sort_order,
          status,
          created_at,
          updated_at
        FROM team_members
        ORDER BY sort_order ASC, id ASC
      `,
    )

  return rows
}

export async function getTeamMemberById(
  teamMemberId: number,
) {
  const [rows] =
    await pool.execute<RowDataPacket[]>(
      `
        SELECT
          id,
          name,
          role,
          description,
          image_url,
          sort_order,
          status,
          created_at,
          updated_at
        FROM team_members
        WHERE id = ?
        LIMIT 1
      `,
      [teamMemberId],
    )

  return rows[0] || null
}

export async function createTeamMember(
  data: CreateTeamMemberInput,
) {
  const [result] =
    await pool.execute<ResultSetHeader>(
      `
        INSERT INTO team_members
          (
            name,
            role,
            description,
            image_url,
            sort_order,
            status
          )
        VALUES
          (?, ?, ?, ?, ?, ?)
      `,
      [
        data.name,
        data.role,
        data.description || null,
        data.image_url || null,
        data.sort_order ?? 0,
        data.status || 'active',
      ],
    )

  return result
}

export async function updateTeamMember(
  teamMemberId: number,
  data: UpdateTeamMemberInput,
) {
  const [result] =
    await pool.execute<ResultSetHeader>({
      sql: `
        UPDATE team_members
        SET
          name = ?,
          role = ?,
          description = ?,
          image_url = ?,
          sort_order = ?,
          status = ?
        WHERE id = ?
      `,
      values: [
        data.name,
        data.role,
        data.description || null,
        data.image_url || null,
        data.sort_order ?? 0,
        data.status || 'active',
        teamMemberId,
      ],
    })

  return result
}

export async function deleteTeamMember(
  teamMemberId: number,
) {
  const [result] =
    await pool.execute<ResultSetHeader>(
      `
        DELETE FROM team_members
        WHERE id = ?
      `,
      [teamMemberId],
    )

  return result
}