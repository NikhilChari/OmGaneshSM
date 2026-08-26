import 'dotenv/config'
import pool from './config/database'

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        description TEXT DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_team_status (status),
        KEY idx_team_sort_order (sort_order)
      ) ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_general_ci
    `)

    console.log('team_members table created successfully.')

    const [rows] = await pool.query(`
      SHOW TABLES
    `)

    console.table(rows)
  } catch (error) {
    console.error('Failed:', error)
  } finally {
    await pool.end()
  }
}

main()