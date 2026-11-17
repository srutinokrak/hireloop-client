export type ApplicationStatus =
    | "Applied"
  | "Review"
  | "Interview"
  | "Shortlisted"
  | "Rejected"
  | "Offered"
    export const STATUS_META: Record<ApplicationStatus, { label: string; color: string }> = {
    Applied: { label: "Applied", color: "#A1A4AA" },
    Review: { label: "Review", color: "#F59E0B" },
   Interview: { label: "Interview", color: "#5C53FE" },
    Shortlisted: { label: "Shortlisted", color: "#60A5FA" },
    Rejected: { label: "Rejected", color: "#EF4444" },
    Offered: { label: "Offered", color: "#22C55E" },
}

export const APPLICATION_STATUSES = Object.keys(STATUS_META) as ApplicationStatus[]