import type { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'

import {
  createTeamMember,
  deleteTeamMember,
  getActiveTeamMembers,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  type UpdateTeamMemberInput,
} from '../services/teamService'

const uploadsDirectory = path.resolve(
  process.cwd(),
  'uploads',
)

function getUploadedImageUrl(
  req: Request,
) {
  if (!req.file) {
    return null
  }

  return `${req.protocol}://${req.get('host')}/uploads/team/${req.file.filename}`
}

function getStoredFilePath(
  imageUrl: string,
) {
  try {
    const parsedUrl = new URL(imageUrl)

    const pathname = decodeURIComponent(
      parsedUrl.pathname,
    )

    const uploadsPrefix = '/uploads/'

    if (!pathname.startsWith(uploadsPrefix)) {
      return null
    }

    const relativePath = pathname
      .slice(uploadsPrefix.length)
      .replace(/\//g, path.sep)

    const uploadsRoot = path.resolve(
      uploadsDirectory,
    )

    const filePath = path.resolve(
      uploadsRoot,
      relativePath,
    )

    if (
      filePath !== uploadsRoot &&
      !filePath.startsWith(
        `${uploadsRoot}${path.sep}`,
      )
    ) {
      return null
    }

    return filePath
  } catch {
    return null
  }
}

async function removeUploadedFile(
  imageUrl: string | null | undefined,
) {
  if (!imageUrl) {
    return
  }

  const filePath =
    getStoredFilePath(imageUrl)

  if (!filePath) {
    return
  }

  try {
    await fs.unlink(filePath)
  } catch (error) {
    const code =
      error &&
      typeof error === 'object' &&
      'code' in error
        ? error.code
        : undefined

    if (code !== 'ENOENT') {
      console.error(
        'Failed to remove uploaded team file:',
        error,
      )
    }
  }
}

function parseTeamMemberInput(
  req: Request,
):
  | {
      name: string
      role: string
      description?: string
      sort_order: number
      status: 'active' | 'inactive'
    }
  | { error: string } {
  const {
    name,
    role,
    description,
    sort_order,
    status,
  } = req.body as {
    name?: unknown
    role?: unknown
    description?: unknown
    sort_order?: unknown
    status?: unknown
  }

  const trimmedName =
    typeof name === 'string'
      ? name.trim()
      : ''

  const trimmedRole =
    typeof role === 'string'
      ? role.trim()
      : ''

  if (!trimmedName || !trimmedRole) {
    return {
      error:
        'Name and role are required.',
    }
  }

  const parsedSortOrder =
    sort_order === undefined ||
    sort_order === ''
      ? 0
      : Number(sort_order)

  if (
    !Number.isInteger(
      parsedSortOrder,
    ) ||
    parsedSortOrder < 0
  ) {
    return {
      error:
        'Display order must be a non-negative integer.',
    }
  }

  const normalizedStatus =
    status === 'inactive'
      ? 'inactive'
      : 'active'

  return {
    name: trimmedName,
    role: trimmedRole,
    description:
      typeof description === 'string'
        ? description.trim()
        : undefined,
    sort_order: parsedSortOrder,
    status: normalizedStatus,
  }
}

export async function listTeamMembers(
  _req: Request,
  res: Response,
) {
  try {
    const members =
      await getActiveTeamMembers()

    return res.status(200).json({
      success: true,
      members,
    })
  } catch (error) {
    console.error(
      'Failed to fetch public team members:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch team members.',
    })
  }
}

export async function listAdminTeamMembers(
  _req: Request,
  res: Response,
) {
  try {
    const members =
      await getAllTeamMembers()

    return res.status(200).json({
      success: true,
      members,
    })
  } catch (error) {
    console.error(
      'Failed to fetch admin team members:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch team members.',
    })
  }
}

export async function submitTeamMember(
  req: Request,
  res: Response,
) {
  const uploadedImageUrl =
    getUploadedImageUrl(req)

  try {
    const parsed =
      parseTeamMemberInput(req)

    if ('error' in parsed) {
      await removeUploadedFile(
        uploadedImageUrl,
      )

      return res.status(400).json({
        success: false,
        message: parsed.error,
      })
    }

    const result =
      await createTeamMember({
        ...parsed,
        image_url:
          uploadedImageUrl || undefined,
      })

    return res.status(201).json({
      success: true,
      message:
        'Team member created successfully.',
      memberId: result.insertId,
      imageUrl:
        uploadedImageUrl,
    })
  } catch (error) {
    await removeUploadedFile(
      uploadedImageUrl,
    )

    console.error(
      'Team member creation failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create team member.',
    })
  }
}

export async function editTeamMember(
  req: Request,
  res: Response,
) {
  const replacementUrl =
    getUploadedImageUrl(req)

  try {
    const memberId =
      Number(req.params.id)

    if (
      !Number.isInteger(memberId) ||
      memberId <= 0
    ) {
      await removeUploadedFile(
        replacementUrl,
      )

      return res.status(400).json({
        success: false,
        message:
          'Invalid team member ID.',
      })
    }

    const member =
      await getTeamMemberById(
        memberId,
      )

    if (!member) {
      await removeUploadedFile(
        replacementUrl,
      )

      return res.status(404).json({
        success: false,
        message:
          'Team member not found.',
      })
    }

    const parsed =
      parseTeamMemberInput(req)

    if ('error' in parsed) {
      await removeUploadedFile(
        replacementUrl,
      )

      return res.status(400).json({
        success: false,
        message: parsed.error,
      })
    }

    const imageUrl =
      replacementUrl ||
      (
        member.image_url
          ? String(member.image_url)
          : undefined
      )

    const result =
      await updateTeamMember(
        memberId,
        {
          ...parsed,
          image_url: imageUrl,
        } as UpdateTeamMemberInput,
      )

    if (
      result.affectedRows === 0
    ) {
      await removeUploadedFile(
        replacementUrl,
      )

      return res.status(404).json({
        success: false,
        message:
          'Team member not found.',
      })
    }

    if (
      replacementUrl &&
      member.image_url
    ) {
      await removeUploadedFile(
        String(member.image_url),
      )
    }

    return res.status(200).json({
      success: true,
      message:
        'Team member updated successfully.',
      imageUrl,
    })
  } catch (error) {
    await removeUploadedFile(
      replacementUrl,
    )

    console.error(
      'Team member update failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to update team member.',
    })
  }
}

export async function removeTeamMember(
  req: Request,
  res: Response,
) {
  try {
    const memberId =
      Number(req.params.id)

    if (
      !Number.isInteger(memberId) ||
      memberId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid team member ID.',
      })
    }

    const member =
      await getTeamMemberById(
        memberId,
      )

    if (!member) {
      return res.status(404).json({
        success: false,
        message:
          'Team member not found.',
      })
    }

    const result =
      await deleteTeamMember(
        memberId,
      )

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Team member not found.',
      })
    }

    await removeUploadedFile(
      member.image_url
        ? String(member.image_url)
        : null,
    )

    return res.status(200).json({
      success: true,
      message:
        'Team member deleted successfully.',
    })
  } catch (error) {
    console.error(
      'Team member deletion failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to delete team member.',
    })
  }
}