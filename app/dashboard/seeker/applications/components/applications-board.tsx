"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/actions/applications"

type Application = JobApplication & { _id?: string }

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-zinc-700/50 text-zinc-300",
  Review: "border border-amber-500/25 bg-amber-500/10 text-amber-400",
  Shortlisted: "border border-blue-500/25 bg-blue-500/10 text-blue-400",
  Rejected: "border border-red-500/25 bg-red-500/10 text-red-400",
  Offered: "border border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
}

function SummaryCard({
  label,
  value,
  valueClassName = "text-white",
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#141416] px-4 py-3">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${valueClassName}`}>{value}</p>
    </div>
  )
}

export function ApplicationsBoard({
  applications,
}: {
  applications: Application[]
}) {
  const [activeTab, setActiveTab] = useState<"Active" | "Archived">("Active")
  const [search, setSearch] = useState("")

  const filteredApplications = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return applications.filter((application) => {
      const isArchived = application.status === "Rejected"
      const matchesTab = activeTab === "Archived" ? isArchived : !isArchived
      const matchesSearch =
        !searchTerm ||
        application.jobTitle.toLowerCase().includes(searchTerm) ||
        application.companyName.toLowerCase().includes(searchTerm)

      return matchesTab && matchesSearch
    })
  }, [activeTab, applications, search])

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length

  return (
    <div className="min-h-screen w-full min-w-0 flex-1 bg-[#09090b] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs text-zinc-500">Seeker / My Applications</p>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/8 bg-[#141416] p-1">
              {(["Active", "Archived"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                    activeTab === tab
                      ? "bg-[#242427] text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              <Download aria-hidden="true" className="size-4" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Applied" value={String(applications.length)} />
          <SummaryCard label="Shortlisted" value={String(shortlistedCount)} />
          <SummaryCard
            label="Interviews"
            value="0"
            valueClassName="text-amber-400"
          />
          <SummaryCard label="Success Rate" value="0%" valueClassName="text-emerald-400" />
        </div>

        <section className="overflow-hidden rounded-xl border border-white/8 bg-[#141416]">
          <div className="border-b border-white/8 p-4">
            <label htmlFor="application-search" className="sr-only">
              Search applications
            </label>
            <div className="relative max-w-sm">
              <Search
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
              />
              <Input
                id="application-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search applications..."
                className="h-10 border-white/8 bg-[#101012] pl-10 text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.02] text-xs text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Job Title</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Applied</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {filteredApplications.map((application) => (
                  <tr
                    key={application._id ?? application.jobId}
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/8 text-zinc-300">
                          <BriefcaseBusiness aria-hidden="true" className="size-4" />
                        </span>
                        <span>
                          <span className="block font-medium text-zinc-100">
                            {application.jobTitle}
                          </span>
                          <span className="mt-1 block text-xs text-zinc-500">
                            {application.jobType} •{" "}
                            {application.remoteWork ? "Remote" : "On-site"}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {application.companyName}
                    </td>
                    <td className="px-5 py-4 text-zinc-400">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/browse-jobs/${application.jobId}`}
                        className="text-xs text-zinc-300 hover:text-white"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-zinc-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/8 px-5 py-3 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredApplications.length} of {applications.length} applications
            </span>
            <nav aria-label="Applications pages" className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="grid size-8 place-items-center rounded-md border border-white/8 hover:bg-white/5"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  type="button"
                  key={page}
                  aria-current={page === 1 ? "page" : undefined}
                  className={`grid size-8 place-items-center rounded-md border ${
                    page === 1
                      ? "border-white bg-white font-medium text-black"
                      : "border-white/8 text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                className="grid size-8 place-items-center rounded-md border border-white/8 hover:bg-white/5"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </nav>
          </div>
        </section>
      </div>
    </div>
  )
}
