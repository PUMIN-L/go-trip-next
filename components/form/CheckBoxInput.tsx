"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type CheckboxInputProps = {
  name: string
  label: string
  className?: string
  defaultChecked?: boolean
  // onChange?: (checked: boolean) => void
}

export default function CheckboxInput({
  name,
  label,
  className,
  defaultChecked = false
}: CheckboxInputProps) {
  const [value, setValue] = useState(defaultChecked)

  useEffect(() => {
    setValue(defaultChecked)
  }, [defaultChecked])

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        id={name}
        name={name}
        // defaultChecked={defaultChecked}
        checked={value}
        onCheckedChange={(val) => {
          if (val === "indeterminate") return
          setValue(val)
        }}
      />
      <label
        htmlFor={name}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {label}
      </label>
    </div>
  )
}
