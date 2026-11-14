const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"



export type JobApplication = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  jobType: string
  location: string
  remoteWork: boolean
  appliedAt: string
  status: ApplicationStatus
}

export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Rejected"
  | "Offered"

export async function applyToAJob(data: JobApplication) {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to submit application (${response.status}).`)
  }

  return response.json()
}