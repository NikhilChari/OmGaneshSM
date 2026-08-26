import {
  useEffect,
  useState,
} from 'react'

import { api } from '@/lib/api'
import type { TeamMember } from '@/lib/api'

function TeamSection() {
  const [members, setMembers] =
    useState<TeamMember[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    let mounted = true

    async function loadTeam() {
      try {
        const result =
          await api.getTeamMembers()

        if (mounted) {
          setMembers(
            result.members,
          )
        }
      } catch (error) {
        console.error(
          'Unable to load team members:',
          error,
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void loadTeam()

    return () => {
      mounted = false
    }
  }, [])

  if (
    !loading &&
    members.length === 0
  ) {
    return null
  }

  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            The People Behind the Work
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Our Team
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Meet the people who help guide, organize and support the Mandal.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 text-center shadow-sm"
                >
                  <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-[#f5ead5]" />

                  <div className="mx-auto mt-6 h-6 w-32 animate-pulse rounded bg-[#f5ead5]" />

                  <div className="mx-auto mt-4 h-12 w-full animate-pulse rounded bg-[#f5ead5]" />
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {members.map(
              (member) => (
                <article
                  key={member.id}
                  className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 text-center shadow-sm"
                >
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-[#f5ead5] text-[#4a1f1f]">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="3.5"
                          />

                          <path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-[#9a3412]">
                    {member.role}
                  </p>

                  {member.description && (
                    <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                      {member.description}
                    </p>
                  )}
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default TeamSection