import pool from '../config/database'

export interface CreateContactMessageInput {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export async function createContactMessage(
  data: CreateContactMessageInput,
) {
  const [result] = await pool.execute(
    `
      INSERT INTO contact_messages
        (name, email, phone, subject, message)
      VALUES
        (?, ?, ?, ?, ?)
    `,
    [
      data.name,
      data.email,
      data.phone || null,
      data.subject || null,
      data.message,
    ],
  )

  return result
}