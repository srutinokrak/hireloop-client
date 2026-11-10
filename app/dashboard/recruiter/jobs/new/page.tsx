"use client"
import type { JobDetails } from "@/lib/types/jobs"
import { JobFormField } from "@/app/components/jobs/JobFormField"
import type { FormEvent } from "react"
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { createJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const fieldClassName =
  "h-10 border-white/10 bg-[#18181b] text-sm placeholder:text-zinc-500"

const labelClassName = "mb-2 block text-sm font-medium text-zinc-200"

const selectClassName =
  "h-10 w-full rounded-lg border border-white/10 bg-[#18181b] px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

const textareaClassName =
  "w-full rounded-lg border border-white/10 bg-[#18181b] px-3 py-2.5 text-sm text-foreground placeholder:text-zinc-500 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const

const NewJobsPage = () => {
  const router = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const jobDetails = {
      ...Object.fromEntries(formData.entries()),
      remoteWork: formData.has("remoteWork"),
      applicants: 0,
      status: "Active",
    } as JobDetails

    // console.log("New job details:", jobDetails)

    const result = await createJob(jobDetails)
    if (result.insertedId) {
      console.log("createJob result", result)
      toast.add({
        title: "Job created",
        description: "The job has been successfully created",
      })
      router.push("/dashboard/recruiter/jobs")
    }
  }
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">
              Manage Jobs <span className="px-1">›</span> Create New Listing
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent.
            </p>
          </div>
        </div>

        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          className="space-y-8 rounded-xl border border-white/10 bg-card/40 p-4 sm:p-6"
        >
          <section aria-labelledby="basic-information-heading">
            <h2
              id="basic-information-heading"
              className="mb-5 text-sm font-semibold text-primary"
            >
              1. Basic Information
            </h2>
            <div className="space-y-5">
              <JobFormField htmlFor="title" label="Job Title" required>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Frontend Developer"
                  className={cn(fieldClassName)}
                />
              </JobFormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className={labelClassName}>
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="company"
                    name="company"
                    required
                    placeholder="Your company"
                    className={cn(fieldClassName)}
                  />
                </div>
                <div>
                  <label htmlFor="category" className={labelClassName}>
                    Job Category <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className={selectClassName}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option>Engineering &amp; Tech</option>
                    <option>Design &amp; Creative</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Finance</option>
                    <option>Customer Support</option>
                    <option>Human Resources</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className={labelClassName}>
                  Job Type <span className="text-destructive">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {jobTypes.map((jobType, index) => (
                    <label
                      key={jobType}
                      className="flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#18181b] text-sm text-muted-foreground transition-colors has-checked:border-primary has-checked:bg-primary/10 has-checked:text-foreground"
                    >
                      <input
                        type="radio"
                        name="jobType"
                        value={jobType}
                        required={index === 0}
                        defaultChecked={index === 0}
                        className="sr-only"
                      />
                      {jobType}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

          <section aria-labelledby="location-compensation-heading">
            <h2
              id="location-compensation-heading"
              className="mb-5 text-sm font-semibold text-primary"
            >
              2. Location, Compensation &amp; Timeline
            </h2>
            <div className="space-y-5">
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#18181b] p-4">
                <span>
                  <span className="block text-sm font-medium">
                    Remote Work Allowed
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Enable remote or distributed candidate applications
                  </span>
                </span>
                <input
                  type="checkbox"
                  name="remoteWork"
                  aria-label="Allow remote work"
                  className="size-4 shrink-0 accent-primary"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className={labelClassName}>
                    Job Location{" "}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <MapPin
                      aria-hidden="true"
                      className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. New York, USA"
                      className={cn(fieldClassName, "pl-9")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="deadline" className={labelClassName}>
                    Application Deadline{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <CalendarDays
                      aria-hidden="true"
                      className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      required
                      className={cn(fieldClassName, "pl-9")}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="minimumSalary" className={labelClassName}>
                    Min Salary / Rate
                  </label>
                  <Input
                    id="minimumSalary"
                    name="minimumSalary"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 25"
                    className={cn(fieldClassName)}
                  />
                </div>
                <div>
                  <label htmlFor="maximumSalary" className={labelClassName}>
                    Max Salary / Rate
                  </label>
                  <Input
                    id="maximumSalary"
                    name="maximumSalary"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 40"
                    className={cn(fieldClassName)}
                  />
                </div>
                <div>
                  <label htmlFor="frequency" className={labelClassName}>
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    defaultValue="per hour"
                    className={selectClassName}
                  >
                    <option>per hour</option>
                    <option>per month</option>
                    <option>per year</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="responsibilities-heading">
            <h2
              id="responsibilities-heading"
              className="mb-5 text-sm font-semibold text-primary"
            >
              3. Responsibilities &amp; Requirements
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="responsibilities" className={labelClassName}>
                  Key Responsibilities{" "}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  required
                  rows={4}
                  placeholder="Describe the main responsibilities for this role."
                  className={textareaClassName}
                />
              </div>
              <div>
                <label htmlFor="qualifications" className={labelClassName}>
                  Qualifications &amp; Requirements{" "}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  rows={4}
                  placeholder="List the experience, skills, and qualifications required."
                  className={textareaClassName}
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end border-t border-white/10 pt-5">
            <Button type="submit" className="h-10 gap-2 rounded-lg px-4">
              Publish Job <BriefcaseBusiness aria-hidden="true" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default NewJobsPage
