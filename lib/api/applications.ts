import type { JobApplication } from "../actions/applications"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApplicationRecord = JobApplication & {
    _id: string
}

export const getApplications = async (query = ""): Promise<ApplicationRecord[]> => {
    const res = await fetch(`${BASE_URL}/applications?${query}`)
    if (!res.ok) {
        throw new Error(`Failed to load applications: ${res.status} ${res.statusText}`)
    }
    return res.json()
}
export const getApplicationsCount = async (query = ""): Promise<{count: number}> => {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)
    return res.json()
}

export const createApplication = async (data: JobApplication) => {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}
