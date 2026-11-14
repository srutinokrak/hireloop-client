"use client"

import { Button } from "@/components/ui/button"
import { applyToAJob } from "@/lib/actions/applications"
import { useSession } from "@/lib/auth-client"
import type { JobDetails } from "@/lib/types/jobs"
import { useRouter } from "next/navigation"

type ApplyJob = JobDetails & { _id: string }

export function ApplyNowButton({ job }: { job: ApplyJob }) {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user

  const handleApplyNow = async() => {
    if (!user){
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
    }
    else if(user.role === 'seeker'){
      //save the application to the database
      //TODO: only send jobId and userId or email address for the application
      const application = {
        jobId: job._id,
        userId : user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.company
      }

       const result = await applyToAJob(application)
       if(result.insertedId){
        console.log("Application submitted successfully");
        router.push('/browse-jobs')
       }
    }
    else{
      console.log("user is not a job seeker");
    }
  }

  return (
       <Button
              type="button"
              onClick={handleApplyNow}
              className="h-9 bg-white px-5 text-zinc-900 hover:bg-zinc-200"
            >
              Apply Now
            </Button>
  )
}