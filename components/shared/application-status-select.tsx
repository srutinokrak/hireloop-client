"use client"

// Native select for changing an application's status. Rendering only —
// persistence is the caller's responsibility (the recruiter applications
// page wires the DB update separately).

import { cn } from "@/lib/utils"
import { APPLICATION_STATUSES, STATUS_META, type ApplicationStatus } from "@/lib/types/applications"

export function ApplicationStatusSelect({
    value,
    onChange,
    className,
}: {
    value: ApplicationStatus
    onChange: (status: ApplicationStatus) => void
    className?: string
}) {
    return (
        <select
            aria-label="Update application status"
            value={value}
            onChange={(event) => onChange(event.target.value as ApplicationStatus)}
            className={cn(
                "surface-field h-9 rounded-md px-2.5 text-[13px] capitalize text-[#EDEDEF]",
                className,
            )}
        >
            {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-[#1A1A1F]">
                    {STATUS_META[status].label}
                </option>
            ))}
        </select>
    )
}
