import { Separator } from "../ui/separator"
import TrendingTrips from "./TrendingTrips"

function SectionTitle({ text }: { text: string }) {
  return (
    <>
      <div>
        <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
          {text}
        </h2>
        <Separator />
      </div>
    </>
  )
}

export default SectionTitle
