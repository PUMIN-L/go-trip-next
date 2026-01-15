import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"
import TrendingTrips from "./TrendingTrips"

function Hero() {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ">
        <div>
          <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-7xl leading-thght">
            Explore the World with Us
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
            From adventure to relaxation, we create unforgettable journeys just
            for you, carefully designed to match your travel style, dreams, and
            moments you will cherish forever.
          </p>
          <Button asChild size="lg" className="mt-10 bg-blue-500 ">
            <Link href={"/products"} prefetch>
              {" "}
              Our Trips{" "}
            </Link>
          </Button>
        </div>
        <HeroCarousel />
      </section>
    </>
  )
}

export default Hero
