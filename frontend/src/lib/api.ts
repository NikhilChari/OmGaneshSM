const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data?.message || 'Something went wrong. Please try again.',
    )
  }

  return data
}

export const api = {
  getNews: () =>
    request<{
      success: boolean
      news: News[]
    }>('/news'),

  getNewsBySlug: (slug: string) =>
    request<{
      success: boolean
      news: News
    }>(`/news/${encodeURIComponent(slug)}`),

  getEvents: () =>
    request<{
      success: boolean
      events: Event[]
    }>('/events'),

  getGallery: () =>
    request<{
      success: boolean
      albums: GalleryAlbum[]
    }>('/gallery'),

  submitContact: (payload: ContactPayload) =>
    request<{
      success: boolean
      message: string
    }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitMembership: (payload: MembershipPayload) =>
    request<{
      success: boolean
      message: string
      membershipId?: number
    }>('/memberships', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

export interface News {
  id?: number
  title: string
  slug: string
  excerpt?: string | null
  content: string
  image_url?: string | null
  published_at?: string | null
  status?: string
}

export interface Event {
  id?: number
  title: string
  slug: string
  description?: string | null
  event_date: string
  start_time?: string | null
  end_time?: string | null
  location?: string | null
  image_url?: string | null
  status?: string
}

export interface GalleryImage {
  id?: number
  album_id?: number
  image_url: string
  caption?: string | null
  sort_order?: number
}

export interface GalleryAlbum {
  id?: number
  title: string
  slug: string
  description?: string | null
  cover_image_url?: string | null
  status?: string
  images?: GalleryImage[]
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface MembershipPayload {
  full_name: string
  email?: string
  phone: string
  address?: string
  message?: string
}