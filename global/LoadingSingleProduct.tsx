import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingSingleProduct() {
  return (
    <>
      <Skeleton className="h-8 w-[50vw] lg:w-90 -mt-5 lg:mt-5" />
      <Skeleton className="h-1 w-full mt-5" />
      <div className="pt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2 ">
        <div className="">
          <LoadingProduct />
        </div>
        <div className="w-[80vw] lg:w-full lg:ml-15 ">
          <Skeleton className="h-8 w-[70vw] lg:w-[22vw] " />
          <Skeleton className="h-4 w-[30vw] lg:w-[10vw]  mt-4" />
          <Skeleton className="h-10 w-[20vw]  mt-4" />
          <Skeleton className="h-60 w-[80vw] lg:w-full mt-4" />
          <Skeleton className="h-10 w-[40vw] lg:w-[10vw] mt-4" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-8 w-[48vw] lg:w-90 mt-5" />
        <Skeleton className="h-1 w-full mt-5" />
        <div className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 place-items-center">
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </div>
    </>
  )
}

function LoadingProduct() {
  return (
    <Card className="w-[80vw] lg:w-full">
      <CardContent className="">
        <Skeleton className="h-95 w-full" />
      </CardContent>
    </Card>
  )
}
export default LoadingSingleProduct

function CommentSkeleton() {
  return (
    <Card className=" w-[80vw] lg:w-[30vw]">
      <CardContent>
        <Skeleton className="h-20 " />
      </CardContent>
    </Card>
  )
}
