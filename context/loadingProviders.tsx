"use client"

import { LoadingProvider } from "@/context/loading-context"

export default function LoadingProviders({
  children
}: {
  children: React.ReactNode
}) {
  return <LoadingProvider>{children}</LoadingProvider>
}
