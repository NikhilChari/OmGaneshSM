import type { NextFunction, Request, Response } from 'express'
import { verifyAuthToken } from '../config/auth'

export interface AuthenticatedRequest extends Request {
  admin?: {
    adminId: number
    email: string
  }
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const [scheme, token] = authorization.split(' ')

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format.',
      })
    }

    const payload = verifyAuthToken(token)

    req.admin = {
      adminId: payload.adminId,
      email: payload.email,
    }

    next()
  } catch (error) {
    console.error('Authentication failed:', error)

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    })
  }
}