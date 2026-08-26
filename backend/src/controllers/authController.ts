import type { Request, Response } from 'express'

import {
  findAdminByEmail,
  verifyAdminPassword,
} from '../services/authService'

import { createAuthToken } from '../config/auth'

export async function login(
  req: Request,
  res: Response,
) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase()

    console.log('[AUTH] Login attempt:', normalizedEmail)

    const admin = await findAdminByEmail(
      normalizedEmail,
    )

    console.log(
      '[AUTH] Admin found:',
      admin
        ? {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            hasPasswordHash: Boolean(
              admin.password_hash,
            ),
            passwordHashLength:
              admin.password_hash?.length,
          }
        : null,
    )

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    console.log('[AUTH] Verifying password...')

    const validPassword =
      await verifyAdminPassword(
        String(password),
        admin.password_hash,
      )

    console.log(
      '[AUTH] Password valid:',
      validPassword,
    )

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    console.log('[AUTH] Creating JWT...')

    const token = createAuthToken({
      adminId: admin.id,
      email: admin.email,
    })

    console.log('[AUTH] Login successful.')

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('[AUTH] Admin login failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to login.',
      error:
        error instanceof Error
          ? error.message
          : String(error),
    })
  }
}