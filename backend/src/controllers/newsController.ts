import type { Request, Response } from 'express'

import {
  createNews,
  getPublishedNews,
  getPublishedNewsBySlug,
  type CreateNewsInput,
} from '../services/newsService'

export async function listNews(
  _req: Request,
  res: Response,
) {
  try {
    const news = await getPublishedNews()

    return res.status(200).json({
      success: true,
      news,
    })
  } catch (error) {
    console.error('Failed to fetch news:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch news.',
    })
  }
}

export async function getNews(
  req: Request,
  res: Response,
) {
  try {
    const { slug } = req.params

    const article = await getPublishedNewsBySlug(Array.isArray(slug) ? slug[0] : slug)

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'News article not found.',
      })
    }

    return res.status(200).json({
      success: true,
      news: article,
    })
  } catch (error) {
    console.error('Failed to fetch news article:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch news article.',
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
    } = req.body as CreateNewsInput

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug and content are required.',
      })
    }

    const finalStatus =
      status === 'published'
        ? 'published'
        : 'draft'

    const finalPublishedAt =
      finalStatus === 'published'
        ? published_at || new Date().toISOString().slice(0, 19).replace('T', ' ')
        : null

    const result = await createNews({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt?.trim(),
      content: content.trim(),
      image_url: image_url?.trim(),
      published_at: finalPublishedAt || undefined,
      status: finalStatus,
    })

    return res.status(201).json({
      success: true,
      message: 'News article created successfully.',
      newsId: result.insertId,
    })
  } catch (error) {
    console.error('News creation failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to create news article.',
    })
  }
}