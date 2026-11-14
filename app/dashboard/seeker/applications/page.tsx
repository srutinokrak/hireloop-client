import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ApplicationsBoard } from "./components/applications-board"
import { auth } from "@/lib/auth"
import { getApplications } from "@/lib/api/applications"

export default async function MyApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  
  const applications = await getApplications(`applicantId=${session?.user.id}`)

  return <ApplicationsBoard applications={applications} />
}
