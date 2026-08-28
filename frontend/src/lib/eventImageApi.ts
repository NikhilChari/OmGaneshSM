const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://om-ganesh-backend.onrender.com/api'

function getAuthToken() {
  return localStorage.getItem('omganesh_admin_token')
}

async function uploadEventImage(
  eventId: number,
  file: File,
  method: 'POST' | 'PUT',
) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(
    `${API_BASE_URL}/events/${eventId}/image`,
    {
      method,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    },
  )

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message || 'Unable to upload event image.',
    )
  }

  return data as {
    success: boolean
    message: string
    imageUrl: string
  }
}

export const eventImageApi = {
  upload: (eventId: number, file: File) =>
    uploadEventImage(eventId, file, 'POST'),

  replace: (eventId: number, file: File) =>
    uploadEventImage(eventId, file, 'PUT'),
}
