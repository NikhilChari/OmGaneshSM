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

    const admin = await findAdminByEmail(
      String(email).trim().toLowerCase(),
    )

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const validPassword =
      await verifyAdminPassword(
        password,
        admin.password_hash,
      )

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = createAuthToken({
      adminId: admin.id,
      email: admin.email,
    })

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
    console.error('Admin login failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to login.',
    })
  }
}