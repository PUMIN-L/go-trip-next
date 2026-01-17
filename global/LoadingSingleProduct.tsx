import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingSingleProduct() {
  return (
    <>
      <Skeleton className="h-8 w-90 mt-5" />
      <Skeleton className="h-1 w-full mt-5" />
      <div className="pt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <LoadingProduct />
        </div>
        <div className="ml-15">
          <Skeleton className="h-8 w-100 " />
          <Skeleton className="h-4 w-40 mt-4" />
          <Skeleton className="h-10 w-20 mt-4" />
          <Skeleton className="h-60 w-110 mt-4" />
          <Skeleton className="h-10 w-40 mt-4" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-8 w-90 mt-5" />
        <Skeleton className="h-1 w-full mt-5" />
        <div className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 place-items-center">
          <Card className="w-[30vw]">
            <CardContent>
              <Skeleton className="h-20 " />
            </CardContent>
          </Card>
          <Card className="w-[30vw]">
            <CardContent>
              <Skeleton className="h-20 " />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function LoadingProduct() {
  return (
    <Card>
      <CardContent className="">
        <Skeleton className="h-95 w-full" />
      </CardContent>
    </Card>
  )
}
export default LoadingSingleProduct
