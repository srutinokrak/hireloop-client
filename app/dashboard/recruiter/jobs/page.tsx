

import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { JobDetails } from "@/lib/types/jobs"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

export type ManagedJob = JobDetails & {
  _id: string

  postedAgo: string
}



function formatCompensation(job: JobDetails) {
  const { minimumSalary, maximumSalary, frequency } = job

  if (!minimumSalary && !maximumSalary) return "Not specified"

  const range =
    minimumSalary && maximumSalary
      ? `${minimumSalary} – ${maximumSalary}`
      : minimumSalary || maximumSalary
  const unit = frequency === "per hour" ? "/ hr" : frequency === "per year" ? "/ yr" : "/ mo"

  return `${range} ${unit}`
}

const categoryStyles: Record<string, string> = {
  Engineering: "text-blue-400",
  Design: "text-orange-400",
  Infrastructure: "text-cyan-400",
  Marketing: "text-violet-400",
  Quality: "text-indigo-400",
}

export default async function ManageJobsPage() {

  const jobs: ManagedJob[]  = await getJobs()

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">
              Manage Jobs <span className="px-1">›</span> Job Listings &amp; Postings
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Manage Job Posts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review live listings, monitor applicants, and update job details across your
              organization.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-10 gap-2 self-start rounded-lg px-4 sm:self-auto"
          >
            <Plus aria-hidden="true" />
            New Job Post
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead className="bg-[#18181b]">
                <tr className="border-b border-white/10 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="px-4 py-4">Job Title &amp; Dept</th>
                  <th scope="col" className="px-4 py-4">Company &amp; Location</th>
                  <th scope="col" className="px-4 py-4">Type</th>
                  <th scope="col" className="px-4 py-4">Compensation</th>
                  <th scope="col" className="px-4 py-4">Applicants</th>
                  <th scope="col" className="px-4 py-4">Status</th>
                  <th scope="col" className="px-4 py-4">Deadline</th>
                  <th scope="col" className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jobs.map((job, index) => (
                  <tr key={job._id} className="text-sm transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary">
                          {index % 2 === 0 ? (
                            <BriefcaseBusiness aria-hidden="true" className="size-4" />
                          ) : (
                            <Building2 aria-hidden="true" className="size-4" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-foreground">{job.title}</span>
                          <span
                            className={`mt-1 block text-xs ${categoryStyles[job.category] ?? "text-muted-foreground"}`}
                          >
                            {job.category}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="block font-medium">{job.company}</span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        {job.remoteWork ? (
                          <Globe2 aria-hidden="true" className="size-3.5 shrink-0" />
                        ) : (
                          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                        )}
                        {job.remoteWork ? `Remote (${job.location})` : job.location}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                        {job.jobType}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {formatCompensation(job)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                        <Users aria-hidden="true" className="size-4 text-muted-foreground" />
                        {job.applicants} Candidates
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                          job.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            job.status === "Active" ? "bg-emerald-400" : "bg-zinc-500"
                          }`}
                        />
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="block text-sm">{job.deadline}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {job.postedAgo}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                          aria-label={`Update ${job.title}`}
                          className="gap-1.5 border-primary/20 bg-primary/10 text-primary"
                        >
                          <Pencil aria-hidden="true" />
                          Update
                        </Button>
                       <DeleteJobDialog job={job}/>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled
                          aria-label={`More actions for ${job.title}`}
                        >
                          <MoreVertical aria-hidden="true" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-muted-foreground">
          
            <span className="hidden items-center gap-1 sm:flex">
              Demo data <ArrowUpRight aria-hidden="true" className="size-3" />
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}