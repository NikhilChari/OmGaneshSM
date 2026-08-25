import type {
  Response,
} from 'express'

import type {
  AuthenticatedRequest,
} from '../middleware/authMiddleware'

import {
  emailBelongsToAnotherAdmin,
  getAdminById,
  updateAdminPassword,
  updateAdminProfile,
  verifyCurrentAdminPassword,
} from '../services/adminService'

export async function getMyProfile(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const adminId = req.admin?.adminId

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const admin = await getAdminById(adminId)

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found.',
      })
    }

    return res.status(200).json({
      success: true,
      admin,
    })
  } catch (error) {
    console.error(
      'Failed to fetch admin profile:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch admin profile.',
    })
  }
}

export async function updateMyProfile(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const adminId = req.admin?.adminId

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const {
      name,
      email,
    } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.',
      })
    }

    const trimmedName = String(name).trim()
    const normalizedEmail = String(email)
      .trim()
      .toLowerCase()

    if (!trimmedName || !normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.',
      })
    }

    const emailTaken =
      await emailBelongsToAnotherAdmin(
        normalizedEmail,
        adminId,
      )

    if (emailTaken) {
      return res.status(409).json({
        success: false,
        message: 'Email is already in use.',
      })
    }

    await updateAdminProfile(
      adminId,
      trimmedName,
      normalizedEmail,
    )

    const updatedAdmin =
      await getAdminById(adminId)

    return res.status(200).json({
      success: true,
      message: 'Admin profile updated successfully.',
      admin: updatedAdmin,
    })
  } catch (error) {
    console.error(
      'Failed to update admin profile:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to update admin profile.',
    })
  }
}

export async function changeMyPassword(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const adminId = req.admin?.adminId

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const {
      current_password,
      new_password,
    } = req.body

    if (!current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message:
          'Current password and new password are required.',
      })
    }

    const currentPasswordValid =
      await verifyCurrentAdminPassword(
        adminId,
        String(current_password),
      )

    if (!currentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.',
      })
    }

    const newPassword =
      String(new_password)

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          'New password must be at least 8 characters long.',
      })
    }

    await updateAdminPassword(
      adminId,
      newPassword,
    )

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully.',
    })
  } catch (error) {
    console.error(
      'Failed to change admin password:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to change password.',
    })
  }
}