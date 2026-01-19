"use client"
import { useFormStatus } from "react-dom"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import { Button } from "../ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type actionType = "edit" | "delete"

export const IconButton = ({
  actionType,
  onClick
}: {
  actionType: actionType
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <FaRegEdit />
      case "delete":
        return <FaRegTrashAlt />
      default:
        const never: never = actionType
        throw new Error(`Invalid action type: ${never}`)
    }
  }

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      onClick={onClick}
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  )
}

type btnSize = "default" | "lg" | "sm" | "icon"

type SubmitButtonProps = {
  className?: string
  text?: string | ReactNode
  size?: btnSize
}

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg"
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("capitalize cursor-pointer hover:bg-amber-600", className)}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          {size === "icon" ? null : "Please wait..."}
        </>
      ) : (
        text
      )}
    </Button>
  )
}
