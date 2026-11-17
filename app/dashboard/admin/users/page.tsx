import { redirect } from "next/navigation"

import { AdminUsersTable } from "./components/admin-users-table"
import { getUsers } from "@/lib/api/users"
import { getSession } from "@/lib/core/server"

export default async function AdminUserPage() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in?redirectTo=%2Fdashboard%2Fadmin%2Fusers")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  const { users, fetchedAt } = await getUsers()
  const adminUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ?? "seeker",
    createdAt: user.createdAt.toISOString(),
    banned: user.banned ?? false,
  }))

  return <AdminUsersTable users={adminUsers} now={fetchedAt} />
}
