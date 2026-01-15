import Hero from "@/components/home/Hero"
import TrendingTrips from "@/components/home/TrendingTrips"
import LoadingContainer from "@/global/LoadingContainer"
import { Suspense } from "react"

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <TrendingTrips />
      </Suspense>
    </>
  )
}

export default HomePage
