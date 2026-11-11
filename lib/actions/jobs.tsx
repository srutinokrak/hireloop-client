import type { JobDetails } from "@/lib/types/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

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

export const deleteJob = async(jobId: string) =>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: 'DELETE'
    })
    return res.json()
}