export type JobStatus = "Active" | "Expired"

export type JobDetails = {
  title: string
  company: string
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