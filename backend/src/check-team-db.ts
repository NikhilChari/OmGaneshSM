import 'dotenv/config'
import pool from './config/database'

async function main() {
  try {
    const [rows] = await pool.query(`
      SELECT
        DATABASE() AS db,
        @@hostname AS host,
        @@port AS port,
        TABLE_SCHEMA,
        TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'team_members'
    `)

    console.table(rows)

    const [columns] = await pool.query(`
      SHOW COLUMNS FROM team_members
    `)

    console.table(columns)
  } catch (error) {
    console.error(error)
  } finally {
    await pool.end()
  }
}

main()
