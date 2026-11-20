"use server"
import { protectedMutation } from "../core/server"
import type { JobDetails, JobRecord, ManagedJob } from "../types/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = ""): Promise<ManagedJob[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (jobId: string): Promise<JobRecord | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(jobId)}`)

  if (res.status === 404) {
    return null
  }
  if (!res.ok) {
    throw new Error(`Failed to load job: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export const createJob = async (data: JobDetails) => {
  const api = `${BASE_URL}/jobs`
  const res = await protectedMutation(api, "POST",data)
  return res.json()
}
