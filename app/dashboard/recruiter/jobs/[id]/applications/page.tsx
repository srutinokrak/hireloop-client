import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, BriefcaseBusiness } from "lucide-react"

import { ApplicationsTable } from "./components/applications-table"
import { getApplications } from "@/lib/api/applications"
import { getJobById } from "@/lib/api/jobs"
import { getSession } from "@/lib/core/server"

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSession()

  if (!session) {
    redirect(
      `/sign-in?redirectTo=${encodeURIComponent(
        `/dashboard/recruiter/jobs/${id}/applications`
      )}`
    )
  }

  if (session.user.role !== "recruiter") {
    redirect("/dashboard")
  }

  const job = await getJobById(id)
  if (!job || job.recruiterId !== session.user.id) {
    notFound()
  }

  const applications = await getApplications(
    `jobId=${encodeURIComponent(id)}`
  )


  return (
    <main className="min-h-screen w-full min-w-0 flex-1 bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/recruiter/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to jobs
        </Link>

        <header className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary">
              <BriefcaseBusiness aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                Recruiter <span className="px-1">›</span> Job Listings{" "}
                <span className="px-1">›</span> Applications
              </p>
              <h1 className="text-xl font-semibold tracking-tight">{job.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} · {applications.length}{" "}
                {applications.length === 1 ? "applicant" : "applicants"}
              </p>
            </div>
          </div>
        </header>

        <ApplicationsTable applications={applications} />
      </div>
    </main>
  )
}
