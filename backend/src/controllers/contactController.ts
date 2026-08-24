import type { Request, Response } from 'express'
import {
  createContactMessage,
  type CreateContactMessageInput,
} from '../services/contactService'

export async function submitContactMessage(
  req: Request,
  res: Response,
) {
  try {
    const { name, email, phone, subject, message } =
      req.body as CreateContactMessageInput

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required.',
      })
    }

    await createContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    })

    return res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully.',
    })
  } catch (error) {
    console.error('Contact message submission failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your message. Please try again later.',
    })
  }
}