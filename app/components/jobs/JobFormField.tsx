import type { ReactNode } from "react"

type JobFormFieldProps = {
  htmlFor: string
  label: string
  required?: boolean
  optional?: boolean
  children: ReactNode
}

export function JobFormField({
  htmlFor,
  label,
  required = false,
  optional = false,
  children,
}: JobFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-zinc-200"
      >
        {label}{" "}
        {required && <span className="text-destructive">*</span>}
        {optional && (
          <span className="text-xs text-muted-foreground">(optional)</span>
        )}
      </label>
      {children}
    </div>
  )
}