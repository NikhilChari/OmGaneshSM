import 'dotenv/config'
import pool from './config/database'

async function main() {
  const [rows] = await pool.query(`
    SELECT
      DATABASE() AS database_name,
      USER() AS mysql_user,
      CURRENT_USER() AS mysql_current_user,
      @@hostname AS hostname,
      @@port AS port,
      VERSION() AS version
  `)

  console.log(rows)

  const [tables] = await pool.query(`
    SHOW TABLES
  `)

  console.log('TABLES:')
  console.table(tables)

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
