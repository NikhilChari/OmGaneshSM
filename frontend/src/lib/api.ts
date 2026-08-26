const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getAuthToken() {
  return localStorage.getItem('omganesh_admin_token')
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = getAuthToken()

  const headers = new Headers(
    options?.headers,
  )

  if (
    options?.body &&
    !(options.body instanceof FormData)
  ) {
    headers.set(
      'Content-Type',
      'application/json',
    )
  }

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    )
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    },
  )

  const contentType =
    response.headers.get('content-type') || ''

  const data = contentType.includes(
    'application/json',
  )
    ? await response.json()
    : null

  if (!response.ok) {
    throw new Error(
      data?.message ||
        'Something went wrong. Please try again.',
    )
  }

  return data as T
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
    }>(
      `/news/${encodeURIComponent(slug)}`,
    ),

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

  getAdminGalleryAlbums: () =>
  request<{
    success: boolean
    albums: GalleryAlbum[]
  }>('/gallery/admin/albums'),

  getGalleryAlbum: (slug: string) =>
    request<{
      success: boolean
      album: GalleryAlbum
    }>(
      `/gallery/${encodeURIComponent(slug)}`,
    ),

  login: (payload: LoginPayload) =>
    request<LoginResponse>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),

  getMyProfile: () =>
    request<{
      success: boolean
      admin: AdminProfile
    }>('/admin/me'),

  updateMyProfile: (
    payload: UpdateAdminProfilePayload,
  ) =>
    request<{
      success: boolean
      message: string
      admin: AdminProfile
    }>('/admin/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  changeMyPassword: (
    payload: ChangePasswordPayload,
  ) =>
    request<{
      success: boolean
      message: string
    }>('/admin/me/password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  submitContact: (
    payload: ContactPayload,
  ) =>
    request<{
      success: boolean
      message: string
    }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitMembership: (
    payload: MembershipPayload,
  ) =>
    request<{
      success: boolean
      message: string
      membershipId?: number
    }>('/memberships', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  createGalleryAlbum: (
    payload: CreateGalleryAlbumPayload,
  ) =>
    request<{
      success: boolean
      message: string
      albumId: number
    }>('/gallery', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateGalleryAlbum: (
    albumId: number,
    payload: UpdateGalleryAlbumPayload,
  ) =>
    request<{
      success: boolean
      message: string
    }>(
      `/gallery/${albumId}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      },
    ),

  deleteGalleryAlbum: (
    albumId: number,
  ) =>
    request<{
      success: boolean
      message: string
    }>(
      `/gallery/${albumId}`,
      {
        method: 'DELETE',
      },
    ),

  uploadGalleryImage: (
    albumId: number,
    file: File,
    payload?: {
      caption?: string
      sort_order?: number
    },
  ) => {
    const formData = new FormData()

    formData.append('image', file)

    if (payload?.caption) {
      formData.append(
        'caption',
        payload.caption,
      )
    }

    if (
      payload?.sort_order !== undefined
    ) {
      formData.append(
        'sort_order',
        String(payload.sort_order),
      )
    }

    return request<{
      success: boolean
      message: string
      imageId: number
      imageUrl: string
    }>(
      `/gallery/${albumId}/images`,
      {
        method: 'POST',
        body: formData,
      },
    )
  },

  updateGalleryImage: (
    albumId: number,
    imageId: number,
    payload: {
      caption?: string
      sort_order?: number
      file?: File
    },
  ) => {
    const formData = new FormData()

    if (payload.file) {
      formData.append(
        'image',
        payload.file,
      )
    }

    if (payload.caption !== undefined) {
      formData.append(
        'caption',
        payload.caption,
      )
    }

    if (
      payload.sort_order !== undefined
    ) {
      formData.append(
        'sort_order',
        String(payload.sort_order),
      )
    }

    return request<{
      success: boolean
      message: string
      imageUrl: string
    }>(
      `/gallery/${albumId}/images/${imageId}`,
      {
        method: 'PUT',
        body: formData,
      },
    )
  },

  deleteGalleryImage: (
    albumId: number,
    imageId: number,
  ) =>
    request<{
      success: boolean
      message: string
    }>(
      `/gallery/${albumId}/images/${imageId}`,
      {
        method: 'DELETE',
      },
    ),
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  token: string
  admin: AdminProfile
}

export interface AdminProfile {
  id: number
  name: string
  email: string
}

export interface UpdateAdminProfilePayload {
  name: string
  email: string
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
}

export interface CreateGalleryAlbumPayload {
  title: string
  slug: string
  description?: string
  cover_image_url?: string
  status?: 'draft' | 'published'
}

export interface UpdateGalleryAlbumPayload {
  title: string
  slug: string
  description?: string
  cover_image_url?: string
  status?: 'draft' | 'published'
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
  created_at?: string
}

export interface GalleryAlbum {
  id?: number
  title: string
  slug: string
  description?: string | null
  cover_image_url?: string | null
  status?: string
  created_at?: string
  updated_at?: string
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