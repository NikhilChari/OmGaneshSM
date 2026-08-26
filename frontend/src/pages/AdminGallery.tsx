import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import { api } from '@/lib/api'

import type {
  GalleryAlbum,
  GalleryImage,
} from '@/lib/api'

interface AlbumForm {
  title: string
  slug: string
  description: string
  cover_image_url: string
  status: 'draft' | 'published'
}

interface ImageEditForm {
  caption: string
  sort_order: string
}

const emptyForm: AlbumForm = {
  title: '',
  slug: '',
  description: '',
  cover_image_url: '',
  status: 'published',
}

function AdminGallery() {
  const [albums, setAlbums] =
    useState<GalleryAlbum[]>([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const [form, setForm] =
    useState<AlbumForm>(emptyForm)

  const [editingAlbumId, setEditingAlbumId] =
    useState<number | null>(null)

  const [managingAlbumId, setManagingAlbumId] =
    useState<number | null>(null)

  const [uploadingImage, setUploadingImage] =
    useState(false)

  const [uploadFile, setUploadFile] =
    useState<File | null>(null)

  const [uploadCaption, setUploadCaption] =
    useState('')

  const [uploadSortOrder, setUploadSortOrder] =
    useState('0')

  const [editingImageId, setEditingImageId] =
    useState<number | null>(null)

  const [imageEditForm, setImageEditForm] =
    useState<ImageEditForm>({
      caption: '',
      sort_order: '0',
    })

  const [imageSavingId, setImageSavingId] =
    useState<number | null>(null)

  const [imageDeleteId, setImageDeleteId] =
    useState<number | null>(null)

  const [replacementFiles, setReplacementFiles] =
    useState<Record<number, File | null>>({})

  async function loadAlbums() {
    setLoading(true)
    setError('')

    try {
      const result =
        await api.getAdminGalleryAlbums()

      setAlbums(result.albums)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load gallery albums.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

  function updateForm(
    field: keyof AlbumForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function startCreate() {
    setEditingAlbumId(null)
    setForm(emptyForm)
    setError('')
    setSuccess('')
  }

  function startEdit(
    album: GalleryAlbum,
  ) {
    setEditingAlbumId(
      album.id ?? null,
    )

    setForm({
      title: album.title,
      slug: album.slug,
      description:
        album.description || '',
      cover_image_url:
        album.cover_image_url || '',
      status:
        album.status === 'draft'
          ? 'draft'
          : 'published',
    })

    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!form.title.trim()) {
      setError(
        'Album title is required.',
      )
      return
    }

    if (!form.slug.trim()) {
      setError(
        'Album slug is required.',
      )
      return
    }

    setSaving(true)

    try {
      if (editingAlbumId) {
        await api.updateGalleryAlbum(
          editingAlbumId,
          {
            title: form.title.trim(),
            slug: form.slug.trim(),
            description:
              form.description.trim(),
            cover_image_url:
              form.cover_image_url.trim(),
            status: form.status,
          },
        )

        setSuccess(
          'Gallery album updated successfully.',
        )
      } else {
        await api.createGalleryAlbum({
          title: form.title.trim(),
          slug: form.slug.trim(),
          description:
            form.description.trim(),
          cover_image_url:
            form.cover_image_url.trim(),
          status: form.status,
        })

        setSuccess(
          'Gallery album created successfully.',
        )
      }

      setForm(emptyForm)
      setEditingAlbumId(null)

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save gallery album.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(
    album: GalleryAlbum,
  ) {
    if (!album.id) {
      return
    }

    const confirmed =
      window.confirm(
        `Delete "${album.title}"? This will also delete its gallery images.`,
      )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await api.deleteGalleryAlbum(
        album.id,
      )

      setSuccess(
        'Gallery album deleted successfully.',
      )

      if (
        editingAlbumId === album.id
      ) {
        startCreate()
      }

      if (
        managingAlbumId === album.id
      ) {
        setManagingAlbumId(null)
      }

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete gallery album.',
      )
    }
  }

  function toggleImageManager(
    albumId: number,
  ) {
    setError('')
    setSuccess('')

    if (
      managingAlbumId === albumId
    ) {
      setManagingAlbumId(null)
      resetImageUploadForm()
      return
    }

    setManagingAlbumId(albumId)
    resetImageUploadForm()
  }

  function resetImageUploadForm() {
    setUploadFile(null)
    setUploadCaption('')
    setUploadSortOrder('0')
    setEditingImageId(null)
    setImageEditForm({
      caption: '',
      sort_order: '0',
    })
  }

  function handleUploadFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] || null

    setUploadFile(file)
  }

  function handleReplacementFileChange(
    imageId: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] || null

    setReplacementFiles((current) => ({
      ...current,
      [imageId]: file,
    }))
  }

  async function handleUploadImage(
    albumId: number,
  ) {
    setError('')
    setSuccess('')

    if (!uploadFile) {
      setError(
        'Please select an image to upload.',
      )
      return
    }

    const parsedSortOrder =
      Number(uploadSortOrder)

    if (
      !Number.isInteger(
        parsedSortOrder,
      ) ||
      parsedSortOrder < 0
    ) {
      setError(
        'Sort order must be a non-negative integer.',
      )
      return
    }

    setUploadingImage(true)

    try {
      await api.uploadGalleryImage(
        albumId,
        uploadFile,
        {
          caption:
            uploadCaption.trim(),
          sort_order:
            parsedSortOrder,
        },
      )

      setSuccess(
        'Gallery image uploaded successfully.',
      )

      resetImageUploadForm()

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to upload gallery image.',
      )
    } finally {
      setUploadingImage(false)
    }
  }

  function startEditImage(
    image: GalleryImage,
  ) {
    if (!image.id) {
      return
    }

    setEditingImageId(image.id)

    setImageEditForm({
      caption:
        image.caption || '',
      sort_order:
        String(
          image.sort_order ?? 0,
        ),
    })

    setError('')
    setSuccess('')
  }

  function cancelEditImage() {
    setEditingImageId(null)

    setImageEditForm({
      caption: '',
      sort_order: '0',
    })
  }

  async function handleUpdateImage(
    albumId: number,
    image: GalleryImage,
  ) {
    if (!image.id) {
      return
    }

    setError('')
    setSuccess('')

    const parsedSortOrder =
      Number(
        imageEditForm.sort_order,
      )

    if (
      !Number.isInteger(
        parsedSortOrder,
      ) ||
      parsedSortOrder < 0
    ) {
      setError(
        'Sort order must be a non-negative integer.',
      )
      return
    }

    const replacementFile =
      replacementFiles[
        image.id
      ] || undefined

    setImageSavingId(image.id)

    try {
      await api.updateGalleryImage(
        albumId,
        image.id,
        {
          caption:
            imageEditForm.caption.trim(),
          sort_order:
            parsedSortOrder,
          file:
            replacementFile,
        },
      )

      setSuccess(
        'Gallery image updated successfully.',
      )

      setReplacementFiles(
        (current) => {
          const next = {
            ...current,
          }

          delete next[image.id!]

          return next
        },
      )

      cancelEditImage()

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update gallery image.',
      )
    } finally {
      setImageSavingId(null)
    }
  }

  async function handleDeleteImage(
    albumId: number,
    image: GalleryImage,
  ) {
    if (!image.id) {
      return
    }

    const confirmed =
      window.confirm(
        'Delete this gallery image?',
      )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')
    setImageDeleteId(image.id)

    try {
      await api.deleteGalleryImage(
        albumId,
        image.id,
      )

      setSuccess(
        'Gallery image deleted successfully.',
      )

      if (
        editingImageId === image.id
      ) {
        cancelEditImage()
      }

      setReplacementFiles(
        (current) => {
          const next = {
            ...current,
          }

          delete next[image.id!]

          return next
        },
      )

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete gallery image.',
      )
    } finally {
      setImageDeleteId(null)
    }
  }

  function renderImageManager(
    album: GalleryAlbum,
  ) {
    if (!album.id) {
      return null
    }

    const images =
      album.images || []

    return (
      <div className="mt-6 border-t border-[#9a3412]/10 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#3f1d1d]">
              Gallery Images
            </h4>

            <p className="mt-1 text-sm text-[#6b554b]">
              {images.length}{' '}
              {images.length === 1
                ? 'image'
                : 'images'}{' '}
              in this album
            </p>
          </div>

          <button
            type="button"
            onClick={resetImageUploadForm}
            className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d]"
          >
            Reset upload form
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-5">
          <h5 className="font-bold text-[#3f1d1d]">
            Upload New Image
          </h5>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor={`gallery-upload-${album.id}`}
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Image
              </label>

              <input
                id={`gallery-upload-${album.id}`}
                type="file"
                accept="image/*"
                onChange={
                  handleUploadFileChange
                }
                className="mt-2 block w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 py-3 text-sm"
              />

              {uploadFile && (
                <p className="mt-2 text-xs text-[#6b554b]">
                  Selected:{' '}
                  {uploadFile.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`gallery-caption-${album.id}`}
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Caption
              </label>

              <input
                id={`gallery-caption-${album.id}`}
                value={uploadCaption}
                onChange={(event) =>
                  setUploadCaption(
                    event.target.value,
                  )
                }
                placeholder="Ganesh idol decoration"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor={`gallery-sort-${album.id}`}
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Sort Order
              </label>

              <input
                id={`gallery-sort-${album.id}`}
                type="number"
                min="0"
                step="1"
                value={uploadSortOrder}
                onChange={(event) =>
                  setUploadSortOrder(
                    event.target.value,
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() =>
                  handleUploadImage(
                    album.id!,
                  )
                }
                disabled={
                  uploadingImage
                }
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {uploadingImage
                  ? 'Uploading...'
                  : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-[#9a3412]/20 bg-white p-8 text-center">
            <h5 className="font-semibold text-[#3f1d1d]">
              No gallery images yet
            </h5>

            <p className="mt-2 text-sm text-[#6b554b]">
              Upload the first image for
              this album above.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {images
              .slice()
              .sort(
                (a, b) =>
                  (a.sort_order ?? 0) -
                  (b.sort_order ?? 0),
              )
              .map((image) => {
                const imageId =
                  image.id

                if (!imageId) {
                  return null
                }

                const isEditing =
                  editingImageId ===
                  imageId

                const isSaving =
                  imageSavingId ===
                  imageId

                const isDeleting =
                  imageDeleteId ===
                  imageId

                const replacementFile =
                  replacementFiles[
                    imageId
                  ]

                return (
                  <article
                    key={imageId}
                    className="overflow-hidden rounded-2xl border border-[#9a3412]/10 bg-white shadow-sm"
                  >
                    <div className="aspect-[16/9] bg-[#f5eadb]">
                      <img
                        src={
                          image.image_url
                        }
                        alt={
                          image.caption ||
                          album.title
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      {!isEditing ? (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#3f1d1d]">
                                {image.caption ||
                                  'No caption'}
                              </p>

                              <p className="mt-1 text-xs text-[#6b554b]">
                                Sort order:{' '}
                                {image.sort_order ??
                                  0}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                startEditImage(
                                  image,
                                )
                              }
                              className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteImage(
                                  album.id!,
                                  image,
                                )
                              }
                              disabled={
                                isDeleting
                              }
                              className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isDeleting
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div>
                            <label
                              htmlFor={`image-caption-${imageId}`}
                              className="block text-sm font-semibold text-[#3f1d1d]"
                            >
                              Caption
                            </label>

                            <input
                              id={`image-caption-${imageId}`}
                              value={
                                imageEditForm.caption
                              }
                              onChange={(
                                event,
                              ) =>
                                setImageEditForm(
                                  (
                                    current,
                                  ) => ({
                                    ...current,
                                    caption:
                                      event
                                        .target
                                        .value,
                                  }),
                                )
                              }
                              className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                            />
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor={`image-sort-${imageId}`}
                              className="block text-sm font-semibold text-[#3f1d1d]"
                            >
                              Sort Order
                            </label>

                            <input
                              id={`image-sort-${imageId}`}
                              type="number"
                              min="0"
                              step="1"
                              value={
                                imageEditForm.sort_order
                              }
                              onChange={(
                                event,
                              ) =>
                                setImageEditForm(
                                  (
                                    current,
                                  ) => ({
                                    ...current,
                                    sort_order:
                                      event
                                        .target
                                        .value,
                                  }),
                                )
                              }
                              className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                            />
                          </div>

                          <div className="mt-4">
                            <label
                              htmlFor={`image-replacement-${imageId}`}
                              className="block text-sm font-semibold text-[#3f1d1d]"
                            >
                              Replace Image
                            </label>

                            <input
                              id={`image-replacement-${imageId}`}
                              type="file"
                              accept="image/*"
                              onChange={(
                                event,
                              ) =>
                                handleReplacementFileChange(
                                  imageId,
                                  event,
                                )
                              }
                              className="mt-2 block w-full rounded-xl border border-[#9a3412]/20 bg-white px-3 py-2 text-xs"
                            />

                            {replacementFile && (
                              <p className="mt-2 text-xs text-[#6b554b]">
                                Replacement:{' '}
                                {
                                  replacementFile.name
                                }
                              </p>
                            )}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateImage(
                                  album.id!,
                                  image,
                                )
                              }
                              disabled={
                                isSaving
                              }
                              className="rounded-xl bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isSaving
                                ? 'Saving...'
                                : 'Save Changes'}
                            </button>

                            <button
                              type="button"
                              onClick={
                                cancelEditImage
                              }
                              disabled={
                                isSaving
                              }
                              className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#3f1d1d] hover:bg-[#fff7ed] disabled:opacity-60"
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteImage(
                                  album.id!,
                                  image,
                                )
                              }
                              disabled={
                                isSaving ||
                                isDeleting
                              }
                              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isDeleting
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
              Om Ganesh
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#3f1d1d]">
              Gallery Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b554b]">
              Create, edit, publish and manage
              your gallery albums and images.
            </p>
          </div>

          <button
            type="button"
            onClick={startCreate}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d]"
          >
            + New Album
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">
              {success}
            </p>
          </div>
        )}

        <section className="mt-8 rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                {editingAlbumId
                  ? 'Edit Album'
                  : 'Create Album'}
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                Album information
              </p>
            </div>

            {editingAlbumId && (
              <button
                type="button"
                onClick={startCreate}
                className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d]"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="album-title"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Title
              </label>

              <input
                id="album-title"
                value={form.title}
                onChange={(event) =>
                  updateForm(
                    'title',
                    event.target.value,
                  )
                }
                placeholder="Ganesh Chaturthi 2026"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="album-slug"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Slug
              </label>

              <input
                id="album-slug"
                value={form.slug}
                onChange={(event) =>
                  updateForm(
                    'slug',
                    event.target.value,
                  )
                }
                placeholder="ganesh-chaturthi-2026"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="album-description"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Description
              </label>

              <textarea
                id="album-description"
                value={form.description}
                onChange={(event) =>
                  updateForm(
                    'description',
                    event.target.value,
                  )
                }
                rows={4}
                placeholder="A collection of photographs..."
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="cover-image"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Cover Image URL
              </label>

              <input
                id="cover-image"
                value={
                  form.cover_image_url
                }
                onChange={(event) =>
                  updateForm(
                    'cover_image_url',
                    event.target.value,
                  )
                }
                placeholder="https://..."
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="album-status"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Status
              </label>

              <select
                id="album-status"
                value={form.status}
                onChange={(event) =>
                  updateForm(
                    'status',
                    event.target.value,
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              >
                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving
                  ? 'Saving...'
                  : editingAlbumId
                    ? 'Update Album'
                    : 'Create Album'}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                Existing Albums
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                {albums.length}{' '}
                {albums.length === 1
                  ? 'album'
                  : 'albums'}
              </p>
            </div>

            <button
              type="button"
              onClick={loadAlbums}
              disabled={loading}
              className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d] disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="mt-5 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
              <p className="text-sm text-[#6b554b]">
                Loading albums...
              </p>
            </div>
          ) : albums.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-[#9a3412]/20 bg-white p-10 text-center">
              <h3 className="font-semibold text-[#3f1d1d]">
                No albums yet
              </h3>

              <p className="mt-2 text-sm text-[#6b554b]">
                Create your first gallery album
                above.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {albums.map((album) => (
                <article
                  key={album.id}
                  className="overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm"
                >
                  <div className="aspect-[16/9] bg-[#f5eadb]">
                    {album.cover_image_url ? (
                      <img
                        src={
                          album.cover_image_url
                        }
                        alt={album.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#6b554b]">
                        No cover image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-[#3f1d1d]">
                        {album.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          album.status ===
                          'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {album.status ||
                          'published'}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#6b554b]">
                      /gallery/{album.slug}
                    </p>

                    {album.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b554b]">
                        {album.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEdit(album)
                        }
                        className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                      >
                        Edit
                      </button>

                      <a
                        href={`/gallery/${album.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#3f1d1d] hover:bg-[#fff7ed]"
                      >
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          toggleImageManager(
                            album.id!,
                          )
                        }
                        className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                          managingAlbumId ===
                          album.id
                            ? 'bg-[#7f1d1d] text-white'
                            : 'border border-[#9a3412]/20 text-[#9a3412] hover:bg-[#fff7ed]'
                        }`}
                      >
                        {managingAlbumId ===
                        album.id
                          ? 'Close Images'
                          : 'Manage Images'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(album)
                        }
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>

                    {managingAlbumId ===
                      album.id &&
                      renderImageManager(
                        album,
                      )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminGallery