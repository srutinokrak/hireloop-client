'use client'
import { ApplicationStatusSelect } from "@/components/shared/application-status-select"
import { StatusPill } from "@/components/shared/status-pill"
import { updateApplicationStatus, type ApplicationStatus } from "@/lib/actions/applications"
import type { ApplicationRecord } from "@/lib/api/applications"
import { useState } from "react"



function formatAppliedDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

export function ApplicationsTable({
  applications,
}: {
  applications: ApplicationRecord[]
}) {

  const [statuses, setStatuses] = useState<Record<string, ApplicationStatus>>(() =>
        Object.fromEntries(applications.map((app) => [app._id, app.status])),
    )

  const handleStatusChange = async (id: string, status: ApplicationStatus)=>{
         const result = await updateApplicationStatus(id, { status });

        console.log('update result', result);

        if (result.modifiedCount > 0) {
            setStatuses((prev) => ({ ...prev, [id]: status }))
        }
  }
  if (applications.length === 0) {
    return (
      <section className="rounded-xl border border-white/10 bg-card/40 px-6 py-12 text-center">
        <h2 className="text-base font-medium">No applications yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Applications for this job will appear here.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-card/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.02] text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-5 py-4 font-medium">
                Applicant
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Applied
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Job type
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Location
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Current status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.map((application) => (
              <tr key={application._id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <span className="block font-medium text-foreground">
                    {application.email}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                  <time dateTime={application.appliedAt}>
                    {formatAppliedDate(application.appliedAt)}
                  </time>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {application.jobType}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {application.remoteWork
                    ? `${application.location} (Remote)`
                    : application.location}
                </td>
                    <td className="px-3 py-3.5">
                                <StatusPill status={statuses[application._id] ?? application.status} />
                            </td>

              
                       <td className="px-3 py-3.5">
                                <ApplicationStatusSelect
                                    value={statuses[application._id] ??application.status}
                                    onChange={(status) => handleStatusChange(application._id, status)}
                                />
                            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-white/10 px-5 py-3 text-xs text-muted-foreground">
        Application statuses are read-only here. Status updates can be connected when the
        backend update endpoint is ready.
      </p>
    </section>
  )
}
