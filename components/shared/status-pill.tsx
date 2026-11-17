
import { STATUS_META, type ApplicationStatus } from "@/lib/types/applications"

export function StatusPill({ status }: { status: ApplicationStatus }) {
  const meta = Object.entries(STATUS_META).find(
    ([key]) => key.toLowerCase() === String(status).trim().toLowerCase()
  )?.[1]

  if (!meta) {
    console.error("Unknown application status:", status)
    return <span>{status}</span>
  }

  const { label, color } = meta

  return (
    <span
      className="inline-flex h-[22px] items-center whitespace-nowrap rounded-full border px-2.5 text-xs font-medium"
      style={{ color, borderColor: color, backgroundColor: `${color}1A` }}
    >
      {label}
    </span>
  )
}