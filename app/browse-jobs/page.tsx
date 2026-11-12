"use client"

import { useEffect, useState } from "react"
import {
  Bookmark,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
} from "lucide-react"

import { getJobs } from "@/lib/api/jobs"
import type { JobDetails } from "@/lib/types/jobs"

type BrowseJob = JobDetails & { _id?: string }
type FilterOption = { label: string; count?: number }

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
const workArrangements = ["Remote", "On-site"]

const handleSearch = () => undefined
const handleFilterChange = () => undefined

function isBrowseJob(value: unknown): value is BrowseJob {
  if (typeof value !== "object" || value === null) return false

  const job = value as Record<string, unknown>
  return (
    typeof job.title === "string" &&
    typeof job.company === "string" &&
    typeof job.category === "string" &&
    typeof job.jobType === "string" &&
    typeof job.remoteWork === "boolean" &&
    typeof job.location === "string" &&
    typeof job.minimumSalary === "string" &&
    typeof job.maximumSalary === "string" &&
    typeof job.frequency === "string"
  )
}

function SearchBar() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSearch()
      }}
      className="flex flex-col gap-3 rounded-xl border border-white/6 bg-[#141416] p-3 sm:flex-row sm:items-center sm:p-3.5"
    >
      <label htmlFor="job-search" className="sr-only">
        Search by job title, company, or keywords
      </label>
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
        />
        <input
          id="job-search"
          type="search"
          placeholder="Search by job title, company, or keywords..."
          onChange={handleSearch}
          className="h-11 w-full rounded-md border border-white/6 bg-[#1a1a1d] pr-3 pl-10 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
        />
      </div>
      <button
        type="submit"
        className="h-11 rounded-md bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 sm:px-6"
      >
        Search Jobs
      </button>
    </form>
  )
}

function FilterGroup({
  title,
  options,
}: {
  title: string
  options: FilterOption[]
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 text-sm font-medium text-white">{title}</legend>
      {options.map(({ label, count }) => (
        <label
          key={label}
          className="flex cursor-pointer items-center justify-between gap-3 text-xs text-zinc-400 hover:text-zinc-200"
        >
          <span className="flex items-center gap-2.5">
            <input
              type="radio"
              name={title}
              value={label}
              onChange={handleFilterChange}
              className="size-3.5 accent-primary"
            />
            {label}
          </span>
          {count !== undefined && (
            <span className="text-[11px] text-zinc-500">{count}</span>
          )}
        </label>
      ))}
    </fieldset>
  )
}

function FilterSidebar({ jobs }: { jobs: BrowseJob[] }) {
  const categories = [...new Set(jobs.map((job) => job.category).filter(Boolean))]

  const filters = [
    {
      title: "Job Type",
      options: jobTypes.map((label) => ({
        label,
        count: jobs.filter((job) => job.jobType === label).length,
      })),
    },
    {
      title: "Work Arrangement",
      options: workArrangements.map((label) => ({
        label,
        count: jobs.filter((job) =>
          label === "Remote" ? job.remoteWork : !job.remoteWork
        ).length,
      })),
    },
    {
      title: "Category",
      options: categories.map((label) => ({
        label,
        count: jobs.filter((job) => job.category === label).length,
      })),
    },
  ]

  return (
    <aside className="rounded-xl border border-white/6 bg-[#141416] p-4">
      <h2 className="mb-5 text-sm font-semibold">Filters</h2>
      <div className="space-y-6">
        {filters.map((filter) => (
          <FilterGroup key={filter.title} {...filter} />
        ))}
      </div>
    </aside>
  )
}

function JobCard({ job }: { job: BrowseJob }) {
  const salary = job.minimumSalary || job.maximumSalary
    ? `$${job.minimumSalary || "—"} - $${job.maximumSalary || "—"}`
    : "Salary not listed"

  return (
    <article className="rounded-xl border border-white/6 bg-[#141416] p-4 transition-colors hover:border-white/12 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/5 bg-[#202023] text-zinc-300">
          <BriefcaseBusiness aria-hidden="true" className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-zinc-100 sm:text-base">
                {job.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-zinc-500">
                <span>{job.company}</span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden="true" className="size-3" />
                  {job.location}
                  {job.remoteWork && " (Remote)"}
                </span>
              </p>
            </div>
            <button
              type="button"
              aria-label={`Save ${job.title}`}
              onClick={handleSearch}
              className="rounded-md p-1 text-zinc-500 hover:text-white"
            >
              <Bookmark aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md border border-white/8 bg-[#19191c] px-2 py-1 text-[11px] text-zinc-300">
              {salary}
              {job.frequency ? ` / ${job.frequency}` : ""}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-[#19191c] px-2 py-1 text-[11px] text-zinc-300">
              <Clock3 aria-hidden="true" className="size-3" />
              {job.jobType}
            </span>
            <span className="rounded-md border border-white/8 bg-[#19191c] px-2 py-1 text-[11px] text-zinc-300">
              {job.category}
            </span>
            {job.status === "Active" && (
              <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-400">
                Active
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function Pagination() {
  return (
    <nav aria-label="Job listing pages" className="flex justify-center pt-2">
      <div className="flex items-center gap-1">
        <PageButton label="Previous page">
          <ChevronLeft aria-hidden="true" className="size-4" />
        </PageButton>
        {[1, 2, 3].map((page) => (
          <button
            type="button"
            key={page}
            aria-current={page === 1 ? "page" : undefined}
            onClick={handleSearch}
            className={`grid size-8 place-items-center rounded-md border text-xs ${
              page === 1
                ? "border-white bg-white font-medium text-black"
                : "border-white/8 text-zinc-400 hover:bg-white/5"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-1 text-xs text-zinc-500">…</span>
        <button
          type="button"
          onClick={handleSearch}
          className="grid size-8 place-items-center rounded-md border border-white/8 text-xs text-zinc-400 hover:bg-white/5"
        >
          42
        </button>
        <PageButton label="Next page">
          <ChevronRight aria-hidden="true" className="size-4" />
        </PageButton>
      </div>
    </nav>
  )
}

function PageButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleSearch}
      className="grid size-8 place-items-center rounded-md border border-white/8 text-zinc-400 hover:bg-white/5"
    >
      {children}
    </button>
  )
}

function JobResults({
  jobs,
  loading,
  error,
}: {
  jobs: BrowseJob[]
  loading: boolean
  error: string
}) {
  return (
    <section aria-labelledby="job-results-heading" className="min-w-0">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 id="job-results-heading" className="text-sm font-semibold text-zinc-100">
          {loading
            ? "Loading jobs..."
            : `Found ${jobs.length} professional job${jobs.length === 1 ? "" : "s"}`}
        </h1>
        <label className="flex items-center gap-2 self-start text-xs text-zinc-500 sm:self-auto">
          Sort by:
          <select
            onChange={handleFilterChange}
            defaultValue="recent"
            className="h-8 rounded-md border border-white/8 bg-[#141416] px-2 text-xs text-zinc-200 outline-none focus:border-white/20"
          >
            <option value="recent">Most Recent</option>
            <option value="salary-low">Salary: Low to High</option>
            <option value="salary-high">Salary: High to Low</option>
          </select>
        </label>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="rounded-xl border border-white/6 bg-[#141416] p-6 text-sm text-zinc-400">
          Loading available jobs...
        </p>
      ) : jobs.length ? (
        <div className="space-y-3">
          {jobs.map((job, index) => (
            <JobCard
              key={job._id ?? `${job.company}-${job.title}-${index}`}
              job={job}
            />
          ))}
          <Pagination />
        </div>
      ) : (
        <p className="rounded-xl border border-white/6 bg-[#141416] p-6 text-sm text-zinc-400">
          {error ? "Job listings are currently unavailable." : "No jobs are available right now."}
        </p>
      )}
    </section>
  )
}

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<BrowseJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function loadJobs() {
      try {
        const response: unknown = await getJobs()
        if (!Array.isArray(response)) {
          throw new Error("The jobs service returned an invalid response.")
        }

        const validJobs = response.filter(isBrowseJob)
        if (active) {
          setJobs(validJobs)
          if (validJobs.length !== response.length) {
            setError("Some job listings could not be displayed.")
          }
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load jobs. Please try again later."
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadJobs()
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <SearchBar />
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[218px_minmax(0,1fr)]">
          <FilterSidebar jobs={jobs} />
          <JobResults jobs={jobs} loading={loading} error={error} />
        </div>
      </div>
    </main>
  )
}
