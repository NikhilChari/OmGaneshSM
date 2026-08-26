import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDirectory = path.resolve(
  process.cwd(),
  'uploads',
  'gallery',
)

fs.mkdirSync(uploadDirectory, {
  recursive: true,
})

const storage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      callback,
    ) => {
      callback(
        null,
        uploadDirectory,
      )
    },

    filename: (
      _req,
      file,
      callback,
    ) => {
      const extension =
        path
          .extname(
            file.originalname,
          )
          .toLowerCase()

      const baseName =
        path
          .basename(
            file.originalname,
            extension,
          )
          .replace(
            /[^a-zA-Z0-9-_]/g,
            '-',
          )
          .replace(
            /-+/g,
            '-',
          )
          .replace(
            /^-|-$/g,
            '',
          )
          .toLowerCase()

      const timestamp =
        Date.now()

      const filename =
        `${baseName || 'gallery-image'}-${timestamp}${extension}`

      callback(
        null,
        filename,
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

  if (
    !allowedMimeTypes.includes(
      file.mimetype,
    )
  ) {
    return callback(
      new Error(
        'Only JPEG, PNG, WebP, and GIF images are allowed.',
      ),
    )
  }

  callback(
    null,
    true,
  )
}

export const galleryUpload =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  })

/*
 * Team member uploads
 */

const teamUploadDirectory =
  path.resolve(
    process.cwd(),
    'uploads',
    'team',
  )

fs.mkdirSync(
  teamUploadDirectory,
  {
    recursive: true,
  },
)

const teamStorage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      callback,
    ) => {
      callback(
        null,
        teamUploadDirectory,
      )
    },

    filename: (
      _req,
      file,
      callback,
    ) => {
      const extension =
        path
          .extname(
            file.originalname,
          )
          .toLowerCase()

      const baseName =
        path
          .basename(
            file.originalname,
            extension,
          )
          .replace(
            /[^a-zA-Z0-9-_]/g,
            '-',
          )
          .replace(
            /-+/g,
            '-',
          )
          .replace(
            /^-|-$/g,
            '',
          )
          .toLowerCase()

      callback(
        null,
        `${
          baseName ||
          'team-member'
        }-${Date.now()}${extension}`,
      )
    },
  })

export const teamUpload =
  multer({
    storage: teamStorage,
    fileFilter,
    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  })