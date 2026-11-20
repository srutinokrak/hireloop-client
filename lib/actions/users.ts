"use server"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateUserRole = async (
  userId: string,
  role: "seeker" | "recruiter" | "admin"
) => {

  const api = `${BASE_URL}/users/${userId}/role`
  
  const response = await protectedMutation(api,"PATCH",{role} )
  return response.json()
}
