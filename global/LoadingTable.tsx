import { Skeleton } from "@/components/ui/skeleton"

function LoadingTable({ rows = 6 }: { rows?: number }) {
  const tableRows = Array.from({ length: rows }, (_, index) => {
    return (
      <div className="mb-6" key={index}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    )
  })
  return (
    <>
      {tableRows}
      <Skeleton className="w-50 h-8 rounded m-auto" />
    </>
  )
}
export default LoadingTable
