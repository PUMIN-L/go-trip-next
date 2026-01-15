import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingCart() {
  return (
    <div className="">
      <Skeleton className="h-8 w-50 mt-5" />
      <Skeleton className="h-1 w-full mt-5" />
      <div className="pt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-8">
        <div className="lg:col-span-5 ">
          <Card className="mb-5">
            <CardContent>
              <Skeleton className="h-20 w-full mt-5" />
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardContent>
              <Skeleton className="h-20 w-full mt-5" />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton className="h-20 w-full mt-5" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardContent>
              <Skeleton className="h-5 w-full mt-5" />
              <Skeleton className="h-5 w-full mt-5" />
              <Skeleton className="h-5 w-full mt-5" />
            </CardContent>
          </Card>

          <Skeleton className="h-10 w-full mt-5" />
        </div>
      </div>
    </div>
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
export default LoadingCart
