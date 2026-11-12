import { JobDetails } from "../types/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query =''):Promise<JobDetails> =>{
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}

export const createJob = async (data: JobDetails) => {
    const res = await fetch(`${BASE_URL}/jobs`,{
        method: 'POST',
        headers: {
            'content-type' : 'application/json',

        },
        body: JSON.stringify(data),

    })
    return res.json()
}