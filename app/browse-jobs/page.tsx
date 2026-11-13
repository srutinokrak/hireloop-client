import { BrowseJobsContent } from "./components/browse-jobs-content"
import { getJobs } from "@/lib/api/jobs"
import type { JobDetails } from "@/lib/types/jobs"

type BrowseJob = JobDetails & { _id?: string }

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

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams
  const urlSearch = new URLSearchParams(
    search as Record<string, string>
  )
  const query = urlSearch.toString()

  console.log("Search params:", query)

  let jobs: BrowseJob[] = []
  let error = ""

  try {
    const response: unknown = await getJobs(query)
    if (!Array.isArray(response)) {
      throw new Error("The jobs service returned an invalid response.")
    }

    jobs = response.filter(isBrowseJob)
    if (jobs.length !== response.length) {
      error = "Some job listings could not be displayed."
    }
  } catch (loadError) {
    console.error("Failed to load jobs:", loadError)
    error =
      loadError instanceof Error
        ? loadError.message
        : "Unable to load jobs. Please try again later."
  }

  return <BrowseJobsContent jobs={jobs} error={error} />
}
