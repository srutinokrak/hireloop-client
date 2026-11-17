export type JobStatus = "Active" | "Expired"

export type JobRecord = JobDetails & {
  _id: string
}

export type ManagedJob = JobRecord & {
  postedAgo: string
}

export type JobDetails = {
  title: string
  company: string
  companyId?: string
  recruiterId: string
  category: string
  jobType: string
  remoteWork: boolean
  location: string
  deadline: string
  minimumSalary: string
  maximumSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  applicants: number
  status: JobStatus
}

// jobType=Part-time&remoteWork=true&category=Technology