import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDirectory = path.resolve(
  process.cwd(),
  'uploads',
  'events',
)

fs.mkdirSync(uploadDirectory, {
  recursive: true,
})

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory)
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()

    callback(
      null,
      `${baseName || 'event-image'}-${Date.now()}${extension}`,
    )
  },
})

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ]

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new Error('Only JPEG, PNG, WebP, and GIF images are allowed.'),
    )
  }

  callback(null, true)
}

export const eventUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})
