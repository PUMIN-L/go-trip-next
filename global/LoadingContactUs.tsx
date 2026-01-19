import { Skeleton } from "@/components/ui/skeleton"

function LoadingContactUs() {
  return (
    <>
      <div className="pt-12  flex items-center justify-center">
        <Skeleton className="h-62 w-140" />
      </div>
    </>
  )
}

export default LoadingContactUs
