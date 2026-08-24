import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not configured')
}

const secret: string = JWT_SECRET

export interface AuthTokenPayload {
  adminId: number
  email: string
}

export function createAuthToken(
  payload: AuthTokenPayload,
) {
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`,
  })
}

export function verifyAuthToken(token: string) {
  return jwt.verify(
    token,
    secret,
  ) as unknown as AuthTokenPayload
}