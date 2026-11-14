"use client"

import { Button } from "@/components/ui/button"
import { applyToAJob } from "@/lib/actions/applications"
import { getApplicationsCount } from "@/lib/api/applications"
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

      // number of jobs applied by user
      const countResult = await getApplicationsCount(`applicantId=${user.id}`)


      // more than 10 and not premium user
      if(countResult.count >=10){
        // redirect to the page

        router.push('/payment')
        return
      }

      else{
            const application = {
        jobId: job._id,
        userId : user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.company,
        jobType: job.jobType,
        location: job.location,
        remoteWork: job.remoteWork,
        appliedAt: new Date().toISOString(),
        status: "Applied" as const,
      }

       const result = await applyToAJob(application)
       if(result.insertedId){
        console.log("Application submitted successfully");
        router.push('/dashboard/seeker/applications')
       }
      }
      //save the application to the database
      //TODO: only send jobId and userId or email address for the application
   
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