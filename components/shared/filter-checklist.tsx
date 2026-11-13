"use client"

import { useRouter, useSearchParams } from "next/navigation"
import type { ChangeEvent } from "react"
import { Check } from "lucide-react"

export type FilterOption = {
  value: string
  label: string
  count?: number
}

type FilterChecklistProps = {
  legend: string
  name: string
  options: readonly FilterOption[]
  multiple?: boolean
  defaultValue?: readonly string[]
}

export function FilterChecklist({
  legend,
  name,
  options,
  multiple = true,
  defaultValue = [],
}: FilterChecklistProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedValues = searchParams.getAll(name)
  const values = selectedValues.length > 0 ? selectedValues : defaultValue

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    console.log(name,event.target.value);
    const params = new URLSearchParams(window.location.search)
    params.set(name,event.target.value)
    router.push(`/browse-jobs?${params.toString()}`)

    if (multiple) {
      const selected = params.getAll(name).filter((value) => value !== input.value)
      params.delete(name)
      selected.forEach((value) => params.append(name, value))
      if (input.checked) params.append(name, input.value)
    } else if (input.checked) {
      params.set(name, input.value)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium text-white">{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className="group flex cursor-pointer items-center justify-between gap-3 text-xs text-zinc-400 hover:text-zinc-200"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={handleInputChange}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-white/10 bg-[#1a1a1d] text-transparent transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary/60"
            >
              <Check className="size-3 stroke-[3]" />
            </span>
            <span className="truncate">{option.label}</span>
          </span>
          {option.count !== undefined && (
            <span className="text-[11px] text-zinc-500">{option.count}</span>
          )}
        </label>
      ))}
    </fieldset>
  )
}
