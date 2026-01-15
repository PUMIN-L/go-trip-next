"use client"

import { useActionState, useEffect } from "react"
import { actionFunction } from "@/utils/types"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const initialState = {
  message: "",
  redirect: ""
}

function FormContainer({
  action,
  children
}: {
  action: actionFunction
  children: React.ReactNode
}) {
  const [state, formAction] = useActionState(action, initialState)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message })
    }

    if (state.redirect) {
      router.push(state.redirect)
    }
  }, [state])
  return <form action={formAction}>{children}</form>
}
export default FormContainer
