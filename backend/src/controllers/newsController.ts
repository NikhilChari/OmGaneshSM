import type {
  Request,
  Response,
} from 'express'

import {
  createNews,
  deleteNews,
  getAllNews,
  getNewsById,
  getPublishedNews,
  getPublishedNewsBySlug,
  updateNews,
  type CreateNewsInput,
  type UpdateNewsInput,
} from '../services/newsService'

function normalizeStatus(
  status: unknown,
): 'draft' | 'published' {
  return status === 'published'
    ? 'published'
    : 'draft'
}

function normalizePublishedAt(
  status: 'draft' | 'published',
  publishedAt: unknown,
) {
  if (status === 'draft') {
    return null
  }

  if (
    typeof publishedAt === 'string' &&
    publishedAt.trim()
  ) {
    return publishedAt.trim()
  }

  return new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
}

function isDuplicateSlugError(
  error: unknown,
) {
  return (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    error.code === 'ER_DUP_ENTRY'
  )
}

export async function listNews(
  _req: Request,
  res: Response,
) {
  try {
    const news =
      await getPublishedNews()

    return res.status(200).json({
      success: true,
      news,
    })
  } catch (error) {
    console.error(
      'Failed to fetch news:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch news.',
    })
  }
}

export async function getNews(
  req: Request,
  res: Response,
) {
  try {
    const slug = Array.isArray(
      req.params.slug,
    )
      ? req.params.slug[0]
      : req.params.slug

    const article =
      await getPublishedNewsBySlug(
        slug,
      )

    if (!article) {
      return res.status(404).json({
        success: false,
        message:
          'News article not found.',
      })
    }

    return res.status(200).json({
      success: true,
      news: article,
    })
  } catch (error) {
    console.error(
      'Failed to fetch news article:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch news article.',
    })
  }
}

export async function listAdminNews(
  _req: Request,
  res: Response,
) {
  try {
    const news =
      await getAllNews()

    return res.status(200).json({
      success: true,
      news,
    })
  } catch (error) {
    console.error(
      'Failed to fetch admin news:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch news articles.',
    })
  }
}

export async function submitNews(
  req: Request,
  res: Response,
) {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      image_url,
      published_at,
      status,
    } =
      req.body as CreateNewsInput

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !content?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Title, slug and content are required.',
      })
    }

    const finalStatus =
      normalizeStatus(status)

    const finalPublishedAt =
      normalizePublishedAt(
        finalStatus,
        published_at,
      )

    try {
      const result =
        await createNews({
          title: title.trim(),
          slug: slug.trim(),
          excerpt:
            excerpt?.trim(),
          content: content.trim(),
          image_url:
            image_url?.trim(),
          published_at:
            finalPublishedAt,
          status: finalStatus,
        })

      return res.status(201).json({
        success: true,
        message:
          'News article created successfully.',
        newsId:
          result.insertId,
      })
    } catch (error) {
      if (
        isDuplicateSlugError(error)
      ) {
        return res.status(409).json({
          success: false,
          message:
            'A news article with this slug already exists.',
        })
      }

      throw error
    }
  } catch (error) {
    console.error(
      'News creation failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create news article.',
    })
  }
}

export async function editNews(
  req: Request,
  res: Response,
) {
  try {
    const newsId =
      Number(req.params.id)

    if (
      !Number.isInteger(newsId) ||
      newsId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid news article ID.',
      })
    }

    const existing =
      await getNewsById(newsId)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          'News article not found.',
      })
    }

    const {
      title,
      slug,
      excerpt,
      content,
      image_url,
      published_at,
      status,
    } =
      req.body as UpdateNewsInput

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !content?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Title, slug and content are required.',
      })
    }

    const finalStatus =
      normalizeStatus(status)

    const finalPublishedAt =
      normalizePublishedAt(
        finalStatus,
        published_at,
      )

    try {
      const result =
        await updateNews(
          newsId,
          {
            title: title.trim(),
            slug: slug.trim(),
            excerpt:
              excerpt?.trim(),
            content: content.trim(),
            image_url:
              image_url?.trim(),
            published_at:
              finalPublishedAt,
            status: finalStatus,
          },
        )

      if (
        result.affectedRows === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            'News article not found.',
        })
      }

      return res.status(200).json({
        success: true,
        message:
          'News article updated successfully.',
      })
    } catch (error) {
      if (
        isDuplicateSlugError(error)
      ) {
        return res.status(409).json({
          success: false,
          message:
            'A news article with this slug already exists.',
        })
      }

      throw error
    }
  } catch (error) {
    console.error(
      'News update failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to update news article.',
    })
  }
}

export async function removeNews(
  req: Request,
  res: Response,
) {
  try {
    const newsId =
      Number(req.params.id)

    if (
      !Number.isInteger(newsId) ||
      newsId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid news article ID.',
      })
    }

    const existing =
      await getNewsById(newsId)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          'News article not found.',
      })
    }

    const result =
      await deleteNews(newsId)

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          'News article not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message:
        'News article deleted successfully.',
    })
  } catch (error) {
    console.error(
      'News deletion failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to delete news article.',
    })
  }
}