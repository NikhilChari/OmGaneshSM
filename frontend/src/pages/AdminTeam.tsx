import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import { api } from '@/lib/api'
import type { TeamMember } from '@/lib/api'

interface TeamForm {
  name: string
  role: string
  description: string
  sort_order: string
  status: 'active' | 'inactive'
}

const emptyForm: TeamForm = {
  name: '',
  role: '',
  description: '',
  sort_order: '0',
  status: 'active',
}

function AdminTeam() {
  const [members, setMembers] =
    useState<TeamMember[]>([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const [form, setForm] =
    useState<TeamForm>(emptyForm)

  const [imageFile, setImageFile] =
    useState<File | null>(null)

  const [imagePreview, setImagePreview] =
    useState('')

  const [editingMemberId, setEditingMemberId] =
    useState<number | null>(null)

  async function loadMembers() {
    setLoading(true)
    setError('')

    try {
      const result =
        await api.getAdminTeamMembers()

      setMembers(result.members)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load team members.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadMembers()
  }, [])

  useEffect(() => {
    if (!imageFile) {
      return
    }

    const url =
      URL.createObjectURL(
        imageFile,
      )

    setImagePreview(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imageFile])

  function resetForm() {
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview('')
    setEditingMemberId(null)
  }

  function updateForm(
    field: keyof TeamForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function startCreate() {
    resetForm()
    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function startEdit(
    member: TeamMember,
  ) {
    setEditingMemberId(
      member.id ?? null,
    )

    setForm({
      name: member.name,
      role: member.role,
      description:
        member.description || '',
      sort_order: String(
        member.sort_order ?? 0,
      ),
      status:
        member.status ===
        'inactive'
          ? 'inactive'
          : 'active',
    })

    setImageFile(null)

    setImagePreview(
      member.image_url || '',
    )

    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setImageFile(
      event.target.files?.[0] ||
        null,
    )
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setSuccess('')

    const sortOrder =
      Number(form.sort_order)

    if (!form.name.trim()) {
      setError(
        'Team member name is required.',
      )
      return
    }

    if (!form.role.trim()) {
      setError(
        'Team member role is required.',
      )
      return
    }

    if (
      !Number.isInteger(
        sortOrder,
      ) ||
      sortOrder < 0
    ) {
      setError(
        'Display order must be a non-negative integer.',
      )
      return
    }

    setSaving(true)

    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        description:
          form.description.trim(),
        sort_order: sortOrder,
        status: form.status,
        file:
          imageFile || undefined,
      }

      if (editingMemberId) {
        await api.updateTeamMember(
          editingMemberId,
          payload,
        )

        setSuccess(
          'Team member updated successfully.',
        )
      } else {
        await api.createTeamMember(
          payload,
        )

        setSuccess(
          'Team member created successfully.',
        )
      }

      resetForm()

      await loadMembers()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save team member.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(
    member: TeamMember,
  ) {
    if (!member.id) {
      return
    }

    const confirmed =
      window.confirm(
        `Delete "${member.name}"? This will also delete their uploaded photo.`,
      )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await api.deleteTeamMember(
        member.id,
      )

      setSuccess(
        'Team member deleted successfully.',
      )

      if (
        editingMemberId ===
        member.id
      ) {
        resetForm()
      }

      await loadMembers()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete team member.',
      )
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
              Om Ganesh
            </p>
            <nav className="mb-8 rounded-2xl border border-[#9a3412]/10 bg-white p-3 shadow-sm">
  <div className="flex flex-wrap items-center gap-2">
    <Link
      to="/admin/gallery"
      className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#fff7ed] hover:text-[#9a3412]"
    >
      Gallery Management
    </Link>

    <Link
      to="/admin/team"
      className="rounded-xl bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white"
    >
      Team Management
    </Link>

    <Link
      to="/admin/news"
      className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#fff7ed] hover:text-[#9a3412]"
    >
      News Management
    </Link>

    <Link
      to="/"
      className="ml-auto rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#f5f5f4]"
    >
      View Website
    </Link>
  </div>
</nav>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#3f1d1d]">
              Team Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b554b]">
              Add, edit, order, activate and manage the people shown on the About page.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/gallery"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#9a3412]/20 bg-white px-5 text-sm font-semibold text-[#9a3412] transition hover:bg-[#fff7ed]"
            >
              Manage Gallery
            </Link>

            <button
              type="button"
              onClick={startCreate}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d]"
            >
              + New Team Member
            </button>
          </div>
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
                {editingMemberId
                  ? 'Edit Team Member'
                  : 'Create Team Member'}
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                Team information and profile photo
              </p>
            </div>

            {editingMemberId && (
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
                htmlFor="team-name"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Name
              </label>

              <input
                id="team-name"
                value={form.name}
                onChange={(event) =>
                  updateForm(
                    'name',
                    event.target.value,
                  )
                }
                placeholder="Nikhil Chari"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="team-role"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Role / Designation
              </label>

              <input
                id="team-role"
                value={form.role}
                onChange={(event) =>
                  updateForm(
                    'role',
                    event.target.value,
                  )
                }
                placeholder="President"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="team-description"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Bio / Description
              </label>

              <textarea
                id="team-description"
                value={form.description}
                onChange={(event) =>
                  updateForm(
                    'description',
                    event.target.value,
                  )
                }
                rows={4}
                placeholder="A short introduction about this team member..."
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="team-order"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Display Order
              </label>

              <input
                id="team-order"
                type="number"
                min="0"
                step="1"
                value={form.sort_order}
                onChange={(event) =>
                  updateForm(
                    'sort_order',
                    event.target.value,
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="team-status"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Status
              </label>

              <select
                id="team-status"
                value={form.status}
                onChange={(event) =>
                  updateForm(
                    'status',
                    event.target
                      .value as
                      | 'active'
                      | 'inactive',
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="team-image"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Team Member Photo
              </label>

              <input
                id="team-image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-[#6b554b]"
              />

              <p className="mt-2 text-xs text-[#6b554b]">
                JPEG, PNG, WebP or GIF. Maximum 10 MB.
              </p>

              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6b554b]">
                    Preview
                  </p>

                  <img
                    src={imagePreview}
                    alt="Team member preview"
                    className="h-32 w-32 rounded-2xl object-cover"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving
                  ? 'Saving...'
                  : editingMemberId
                    ? 'Update Team Member'
                    : 'Create Team Member'}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                Existing Team Members
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                {members.length}{' '}
                {members.length === 1
                  ? 'member'
                  : 'members'}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                void loadMembers()
              }
              disabled={loading}
              className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d] disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="mt-5 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
              <p className="text-sm text-[#6b554b]">
                Loading team members...
              </p>
            </div>
          ) : members.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-[#9a3412]/20 bg-white p-10 text-center">
              <h3 className="font-semibold text-[#3f1d1d]">
                No team members yet
              </h3>

              <p className="mt-2 text-sm text-[#6b554b]">
                Create your first team member above.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {members.map(
                (member) => (
                  <article
                    key={member.id}
                    className="overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm"
                  >
                    <div className="aspect-[4/3] bg-[#f5eadb]">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[#6b554b]">
                          No photo
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-[#3f1d1d]">
                            {member.name}
                          </h3>

                          <p className="mt-1 text-sm font-semibold text-[#9a3412]">
                            {member.role}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            member.status ===
                            'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {member.status ||
                            'active'}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-[#6b554b]">
                        Display order:{' '}
                        {member.sort_order ??
                          0}
                      </p>

                      {member.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b554b]">
                          {member.description}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              member,
                            )
                          }
                          className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete(
                              member,
                            )
                          }
                          className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminTeam