"use client"

import { FilterChecklist, type FilterOption } from "@/components/shared/filter-checklist"
import type { JobDetails } from "@/lib/types/jobs"

type BrowseJob = JobDetails

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

export function JobFiltersPanel({ jobs }: { jobs: BrowseJob[] }) {
  const categories = [...new Set(jobs.map((job) => job.category).filter(Boolean))]

  const jobTypeOptions: FilterOption[] = jobTypes.map((label) => ({
    value: label,
    label,
    count: jobs.filter((job) => job.jobType === label).length,
  }))

  const categoryOptions: FilterOption[] = categories.map((label) => ({
    value: label,
    label,
    count: jobs.filter((job) => job.category === label).length,
  }))

  const workArrangementOptions: FilterOption[] = [
    {
      value: "true",
      label: "Remote only",
      count: jobs.filter((job) => job.remoteWork).length,
    },
    {
      value: "false",
      label: "On-site only",
      count: jobs.filter((job) => !job.remoteWork).length,
    },
  ]

  return (
    <aside className="rounded-xl border border-white/6 bg-[#141416] p-4">
      <h2 className="mb-5 text-sm font-semibold">Filters</h2>
      <div className="space-y-6">
        <FilterChecklist
          legend="Job Type"
          name="jobType"
          options={jobTypeOptions}
          multiple={false}
        />
        <FilterChecklist
          legend="Job Category"
          name="category"
          options={categoryOptions}
          multiple={false}
        />
        <FilterChecklist
          legend="Work Arrangement"
          name="remoteWork"
          options={workArrangementOptions}
          multiple={false}
        />
      </div>
    </aside>
  )
}
