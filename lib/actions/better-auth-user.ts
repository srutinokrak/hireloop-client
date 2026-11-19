import { headers } from "next/headers";
import { auth } from "../auth";

export const getUsers = async()=>{
    const users = await auth.api.listUsers({
    query: {
   
        sortBy: "name", // The field to sort by.
        sortDirection: "desc", // The direction to sort by.

    },
    headers: await headers(),
});
  return {
    ...users,
    fetchedAt: Date.now(),
  }
}