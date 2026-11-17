import { getUsers } from "@/lib/api/users"
import React from "react"

const AdminDashboardPage = async () => {
  const users = await getUsers()
  console.log('users',users);
  return (
    <div>
      <h2>Admin DashboardPage</h2>
    </div>
  )
}

export default AdminDashboardPage
