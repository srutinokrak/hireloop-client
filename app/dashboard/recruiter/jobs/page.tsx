"use client"

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
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { JobDetails } from "./new/page"

type ManagedJob = JobDetails & {
  id: string
  applicants: number
  status: "Active" | "Expired"
  postedAgo: string
}

const jobs: ManagedJob[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering",
    jobType: "Full-time",
    remoteWork: true,
    location: "New York, USA",
    deadline: "May 30, 2025",
    minimumSalary: "25",
    maximumSalary: "40",
    frequency: "per hour",
    responsibilities: "Build and maintain user-facing web applications.",
    qualifications: "Experience with React and TypeScript.",
    applicants: 34,
    status: "Active",
    postedAgo: "Posted 4d ago",
  },
  {
    id: "job-2",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design",
    jobType: "Full-time",
    remoteWork: false,
    location: "London, UK (Hybrid)",
    deadline: "Jun 14, 2025",
    minimumSalary: "90000",
    maximumSalary: "115000",
    frequency: "per year",
    responsibilities: "Lead product design from discovery through delivery.",
    qualifications: "A strong product design portfolio and 5+ years of experience.",
    applicants: 19,
    status: "Active",
    postedAgo: "Posted 1w ago",
  },
  {
    id: "job-3",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Infrastructure",
    jobType: "Full-time",
    remoteWork: false,
    location: "Berlin, Germany",
    deadline: "Jun 30, 2025",
    minimumSalary: "95000",
    maximumSalary: "120000",
    frequency: "per year",
    responsibilities: "Maintain cloud infrastructure and delivery pipelines.",
    qualifications: "Experience with cloud platforms and CI/CD.",
    applicants: 12,
    status: "Active",
    postedAgo: "Posted 2w ago",
  },
  {
    id: "job-4",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    jobType: "Full-time",
    remoteWork: true,
    location: "EU/US",
    deadline: "Jul 15, 2025",
    minimumSalary: "80000",
    maximumSalary: "105000",
    frequency: "per year",
    responsibilities: "Develop go-to-market plans and product messaging.",
    qualifications: "Experience in product marketing and campaign strategy.",
    applicants: 27,
    status: "Active",
    postedAgo: "Posted 5d ago",
  },
  {
    id: "job-5",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Quality",
    jobType: "Part-time",
    remoteWork: false,
    location: "Dublin, Ireland (Hybrid)",
    deadline: "May 1, 2025",
    minimumSalary: "35",
    maximumSalary: "50",
    frequency: "per hour",
    responsibilities: "Create and maintain automated quality checks.",
    qualifications: "Experience with test automation frameworks.",
    applicants: 8,
    status: "Expired",
    postedAgo: "Closed",
  },
]

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

export default function ManageJobsPage() {
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
                  <tr key={job.id} className="text-sm transition-colors hover:bg-white/[0.02]">
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
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          disabled
                          aria-label={`Delete ${job.title}`}
                          className="border-white/10"
                        >
                          <Trash2 aria-hidden="true" />
                        </Button>
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
            <span>Showing {jobs.length} sample job posts</span>
            <span className="hidden items-center gap-1 sm:flex">
              Demo data <ArrowUpRight aria-hidden="true" className="size-3" />
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}