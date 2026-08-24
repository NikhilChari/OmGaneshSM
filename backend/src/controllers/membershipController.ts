import type { Request, Response } from 'express'
import {
  createMembership,
  type CreateMembershipInput,
} from '../services/membershipService'

export async function submitMembership(
  req: Request,
  res: Response,
) {
  try {
    const {
      full_name,
      email,
      phone,
      address,
      message,
    } = req.body as CreateMembershipInput

    if (!full_name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name and phone are required.',
      })
    }

    const result = await createMembership({
      full_name: full_name.trim(),
      email: email?.trim(),
      phone: phone.trim(),
      address: address?.trim(),
      message: message?.trim(),
    })

    return res.status(201).json({
      success: true,
      message: 'Membership application submitted successfully.',
      membershipId: result.insertId,
    })
  } catch (error) {
    console.error('Membership submission failed:', error)

    return res.status(500).json({
      success: false,
      message:
        'Unable to submit your membership application. Please try again later.',
    })
  }
}