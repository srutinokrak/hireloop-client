"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function JobSearchBar() {

  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
   const formData = new FormData(event.currentTarget)
   const data = Object.fromEntries(formData.entries())
   console.log(data);
   const search = data.searchField
   
   const params = new URLSearchParams()
   params.set('search',search as string)
   router.push(`/browse-jobs?${params.toString()}`)

  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-white/6 bg-[#141416] p-3 sm:flex-row sm:items-center sm:p-3.5"
    >
      <label htmlFor="job-search" className="sr-only">
        Search by job title, company, or keywords
      </label>
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
        />
        <Input
          id="job-search"
          name="searchField"
          type="search"
          placeholder="Search by job title, company, or keywords..."
          className="h-11 w-full rounded-md border-white/6 bg-[#1a1a1d] pr-3 pl-10 text-sm text-white placeholder:text-zinc-500"
        />
      </div>
      <Button
        type="submit"
        className="h-11 bg-white px-5 text-zinc-900 hover:bg-zinc-200 sm:px-6"
      >
        Search Jobs
      </Button>
    </form>
  )
}
