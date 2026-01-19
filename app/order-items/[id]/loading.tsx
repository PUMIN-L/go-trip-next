import { Skeleton } from "@/components/ui/skeleton"
import LoadingTable from "@/global/LoadingTable"

function loading() {
  return (
    <>
      <Skeleton className="w-40 h-8 mb-5 rounded" />
      <LoadingTable rows={3} />
    </>
  )
}

export default loading
