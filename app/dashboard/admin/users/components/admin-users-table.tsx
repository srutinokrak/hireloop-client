"use client"

import { useMemo, useState } from "react"
import { Download, Search, ShieldCheck, UserRound, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

const roles = ["admin", "recruiter", "seeker"] as const
type UserRole = (typeof roles)[number]

type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  banned: boolean
}

function isUserRole(role: string): role is UserRole {
  return roles.some((knownRole) => knownRole === role)
}

function getRoleStyle(role: string) {
  if (role === "admin") return "border-violet-500/25 bg-violet-500/10 text-violet-300"
  if (role === "recruiter") return "border-indigo-500/25 bg-indigo-500/10 text-indigo-300"
  return "border-white/10 bg-white/5 text-zinc-300"
}

function formatJoinDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "Unknown"
    : date.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accentClass,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  accentClass: string
}) {
  return (
    <article className="rounded-xl border border-white/8 bg-[#141416] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-400">{label}</p>
        <span className={`grid size-8 place-items-center rounded-lg bg-white/[0.04] ${accentClass}`}>
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
      <p className={`mt-1 text-xs ${accentClass}`}>{detail}</p>
    </article>
  )
}

export function AdminUsersTable({
  users,
  now,
}: {
  users: AdminUser[]
  now: number
}) {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [roleDrafts, setRoleDrafts] = useState<Record<string, UserRole>>({})

  const filteredUsers = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [roleFilter, search, users])

  const recruiterCount = users.filter((user) => user.role === "recruiter").length
  const suspendedCount = users.filter((user) => user.banned).length
  const newUsersCount = users.filter((user) => {
    const createdAt = new Date(user.createdAt).getTime()
    const age = now - createdAt
    return Number.isFinite(createdAt) && age >= 0 && age < 24 * 60 * 60 * 1000
  }).length

  function handleRoleSelection(userId: string, role: UserRole) {
    setRoleDrafts((current) => ({ ...current, [userId]: role }))
  }

  function handleExport() {
    const rows = [
      ["Name", "Email", "Role", "Joined", "Status"],
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        roleDrafts[user.id] ?? user.role,
        formatJoinDate(user.createdAt),
        user.banned ? "Suspended" : "Active",
      ]),
    ]
    const csv = rows
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","))
      .join("\r\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "hireloop-users.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen min-w-0 flex-1 bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs text-zinc-500">Admin / Manage Users</p>

        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Review user accounts and preview role changes.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg bg-white px-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 sm:self-auto"
          >
            <Download aria-hidden="true" className="size-4" />
            Export list
          </button>
        </header>

        <section
          aria-label="User summary"
          className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            label="Total users"
            value={users.length.toLocaleString()}
            detail="All registered accounts"
            icon={Users}
            accentClass="text-emerald-400"
          />
          <MetricCard
            label="Recruiters"
            value={recruiterCount.toLocaleString()}
            detail="Recruiter accounts"
            icon={UserRound}
            accentClass="text-violet-400"
          />
          <MetricCard
            label="Suspended accounts"
            value={suspendedCount.toLocaleString()}
            detail={
              users.length
                ? `${((suspendedCount / users.length) * 100).toFixed(1)}% of total`
                : "0% of total"
            }
            icon={ShieldCheck}
            accentClass="text-red-400"
          />
          <MetricCard
            label="New signups (24h)"
            value={newUsersCount.toLocaleString()}
            detail="Accounts created in the last day"
            icon={Users}
            accentClass="text-amber-400"
          />
        </section>

        <section className="overflow-hidden rounded-xl border border-white/8 bg-[#141416]">
          <div className="flex flex-col gap-3 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="user-search" className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search users by name or email</span>
              <Search
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
              />
              <Input
                id="user-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or email..."
                className="h-9 border-white/8 bg-[#101012] pl-10 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Role</span>
              <select
                aria-label="Filter users by role"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="h-9 rounded-lg border border-white/10 bg-[#101012] px-3 text-sm text-zinc-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <option value="all">All roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-medium">User name</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Email address</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Role</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Join date</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Set role (preview)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {filteredUsers.map((user) => {
                  const currentRole = isUserRole(user.role) ? user.role : "seeker"
                  const selectedRole = roleDrafts[user.id] ?? currentRole
                  const hasDraft = selectedRole !== currentRole

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#242427] text-xs font-semibold text-zinc-200">
                            {user.name
                              .split(/\s+/)
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((part) => part[0]?.toUpperCase())
                              .join("") || "U"}
                          </span>
                          <span className="font-medium text-zinc-100">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-zinc-400">{user.email}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs capitalize ${getRoleStyle(currentRole)}`}
                        >
                          {currentRole}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-400">
                        {formatJoinDate(user.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                            user.banned
                              ? "bg-red-500/10 text-red-400"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              user.banned ? "bg-red-400" : "bg-emerald-400"
                            }`}
                          />
                          {user.banned ? "Suspended" : "Active"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {roles.map((role) => (
                            <button
                              key={role}
                              type="button"
                              aria-pressed={selectedRole === role}
                              onClick={() => handleRoleSelection(user.id, role)}
                              className={`rounded-md px-2 py-1.5 text-xs capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                                selectedRole === role
                                  ? "bg-primary/15 text-primary"
                                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                          {hasDraft && (
                            <span className="ml-1 text-[11px] text-amber-400">Not saved</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-zinc-500">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/8 px-5 py-3 text-xs text-zinc-500">
            Showing {filteredUsers.length.toLocaleString()} of {users.length.toLocaleString()} users.
            Role buttons only change this page’s preview; no role updates are saved.
          </div>
        </section>
      </div>
    </main>
  )
}
