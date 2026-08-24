import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000

app.listen(PORT, () => {
  console.log(`Om Ganesh API running on http://localhost:${PORT}`)
})