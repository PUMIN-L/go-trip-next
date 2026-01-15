import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingContainerProductPage() {
  return (
    <>
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-8 w-50 mt-5" />
      <Skeleton className="h-1 w-full mt-5" />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </>
  )
}

function LoadingProduct() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4 mt-4" />
        <Skeleton className="h-4 w-1/4 mt-4" />
      </CardContent>
    </Card>
  )
}
export default LoadingContainerProductPage
