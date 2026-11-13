import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/api/jobs"
import type { JobDetails } from "@/lib/types/jobs"

type BrowseJob = JobDetails & { _id: string }

function isBrowseJob(value: unknown): value is BrowseJob {
  if (typeof value !== "object" || value === null || !("_id" in value)) {
    return false
  }

  const job = value as Record<string, unknown>
  return (
    typeof job._id === "string" &&
    typeof job.title === "string" &&
    typeof job.company === "string" &&
    typeof job.category === "string" &&
    typeof job.jobType === "string" &&
    typeof job.remoteWork === "boolean" &&
    typeof job.location === "string" &&
    typeof job.minimumSalary === "string" &&
    typeof job.maximumSalary === "string" &&
    typeof job.frequency === "string" &&
    typeof job.deadline === "string" &&
    typeof job.responsibilities === "string" &&
    typeof job.qualifications === "string"
  )
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const response: unknown = await getJobs()

  if (!Array.isArray(response)) {
    throw new Error("The jobs service returned an invalid response.")
  }

  const job = response.filter(isBrowseJob).find((item) => item._id === id)
  if (!job) notFound()

  const salary = job.minimumSalary || job.maximumSalary
    ? `$${job.minimumSalary || "—"} - $${job.maximumSalary || "—"}${job.frequency ? ` / ${job.frequency}` : ""}`
    : "Not specified"

  const jobInfo = [
    {
      label: "Salary Range",
      value: salary,
      icon: <Wallet aria-hidden="true" className="size-4" />,
    },
    {
      label: "Location",
      value: `${job.location}${job.remoteWork ? " (Remote)" : ""}`,
      icon: <MapPin aria-hidden="true" className="size-4" />,
    },
    {
      label: "Job Type",
      value: job.jobType,
      icon: <Clock3 aria-hidden="true" className="size-4" />,
    },
    {
      label: "Apply By",
      value: job.deadline || "Not specified",
      icon: <CalendarDays aria-hidden="true" className="size-4" />,
    },
  ]

  const sections = [
    { title: "Responsibilities", text: job.responsibilities },
    { title: "Requirements", text: job.qualifications },
  ]

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/browse-jobs"
          className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to jobs
        </Link>

        <header className="mb-5 flex flex-col gap-5 rounded-xl border border-white/6 bg-[#141416] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-xl border border-white/8 bg-[#202023] text-zinc-300">
              <BriefcaseBusiness aria-hidden="true" className="size-6" />
            </div>
            <div>
              <p className="mb-1 text-xs text-zinc-500">
                Browse Jobs <span className="px-1">/</span> Job Details
              </p>
              <h1 className="text-xl font-semibold sm:text-2xl">{job.title}</h1>
              <p className="mt-1 text-sm text-zinc-400">{job.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Save job"
              className="border-white/10 bg-[#1a1a1d] text-zinc-300 hover:bg-white/10"
            >
              <Bookmark aria-hidden="true" />
            </Button>
            <Button
              type="button"
              className="h-9 bg-white px-5 text-zinc-900 hover:bg-zinc-200"
            >
              Apply Now
            </Button>
          </div>
        </header>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-5">
            <section
              aria-label="Job summary"
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {jobInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/6 bg-[#141416] p-4"
                >
                  <div className="flex items-center gap-2 text-zinc-400">
                    {item.icon}
                    <span className="text-[11px] font-medium uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </section>

            <article className="rounded-xl border border-white/6 bg-[#141416] px-5 sm:px-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="border-b border-white/6 py-6 last:border-b-0"
                >
                  <h2 className="mb-4 text-base font-semibold">
                    {section.title}
                  </h2>
                  {section.text.trim() ? (
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-400 marker:text-zinc-500">
                      {section.text
                        .split(/\r?\n/)
                        .filter((line) => line.trim())
                        .map((line, index) => (
                          <li key={index}>{line.replace(/^[\s•*-]+/, "")}</li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-zinc-500">
                      Not provided by the employer.
                    </p>
                  )}
                </section>
              ))}
            </article>
          </div>

          <aside className="rounded-xl border border-white/6 bg-[#141416] p-5">
            <h2 className="text-base font-semibold">Company Overview</h2>
            <div className="mt-4 grid aspect-[16/9] place-items-center rounded-lg border border-white/6 bg-[#1a1a1d] text-zinc-500">
              <BriefcaseBusiness aria-hidden="true" className="size-10" />
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Company</dt>
                <dd className="text-right text-zinc-200">{job.company}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Industry</dt>
                <dd className="text-right text-zinc-200">{job.category}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Location</dt>
                <dd className="text-right text-zinc-200">{job.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  )
}
