import { Bookmark, BriefcaseBusiness, Clock3, MapPin } from "lucide-react"

import type { JobDetails } from "@/lib/types/jobs"
import Link from "next/link"

type BrowseJob = JobDetails & { _id?: string }

export function JobCard({ job }: { job: BrowseJob }) {
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
                <Link
                  href={job._id ? `/browse-jobs/${job._id}` : "/browse-jobs"}
                  className="transition-colors hover:text-primary"
                >
                  {job.title}
                </Link>
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
