"use client"
import { useLoading } from "@/context/loading-context"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"

type btnSize = "default" | "lg" | "sm"
type SubmitButtonProps = {
  className?: string
  text?: string
  size?: btnSize
}

export function CartSubmitButton({
  className = "",
  text = "submit",
  size = "lg"
}: SubmitButtonProps) {
  const { loading } = useLoading()
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending || loading}
      className={cn("capitalize cursor-pointer hover:bg-amber-600", className)}
      size={size}
    >
      {pending || loading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}
