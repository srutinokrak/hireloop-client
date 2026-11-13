"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { JobCard } from "./job-card"
import { JobFiltersPanel } from "./job-filters-panel"
import { JobSearchBar } from "./job-search-bar"
import type { JobDetails } from "@/lib/types/jobs"

type BrowseJob = JobDetails & { _id?: string }

function Pagination() {
  return (
    <nav aria-label="Job listing pages" className="flex justify-center pt-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          className="grid size-8 place-items-center rounded-md border border-white/8 text-zinc-400 hover:bg-white/5"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            type="button"
            key={page}
            aria-current={page === 1 ? "page" : undefined}
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
          className="grid size-8 place-items-center rounded-md border border-white/8 text-xs text-zinc-400 hover:bg-white/5"
        >
          42
        </button>
        <button
          type="button"
          aria-label="Next page"
          className="grid size-8 place-items-center rounded-md border border-white/8 text-zinc-400 hover:bg-white/5"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </nav>
  )
}

function JobResults({
  jobs,
  error,
}: {
  jobs: BrowseJob[]
  error: string
}) {
  return (
    <section aria-labelledby="job-results-heading" className="min-w-0">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1
          id="job-results-heading"
          className="text-sm font-semibold text-zinc-100"
        >
          Found {jobs.length} professional job{jobs.length === 1 ? "" : "s"}
        </h1>
        <label className="flex items-center gap-2 self-start text-xs text-zinc-500 sm:self-auto">
          Sort by:
          <select
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

      {jobs.length > 0 ? (
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
          {error
            ? "Job listings are currently unavailable."
            : "No jobs are available right now."}
        </p>
      )}
    </section>
  )
}

export function BrowseJobsContent({
  jobs,
  error,
}: {
  jobs: BrowseJob[]
  error: string
}) {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <JobSearchBar />
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[218px_minmax(0,1fr)]">
          <JobFiltersPanel jobs={jobs} />
          <JobResults jobs={jobs} error={error} />
        </div>
      </div>
    </main>
  )
}
