import { FaStar, FaRegStar } from "react-icons/fa"

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating)

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, i) => {
        return isFilled ? (
          <FaStar className={"text-yellow-400"} key={i} />
        ) : (
          <FaRegStar className={"text-gray-600"} key={i} />
        )
      })}
    </div>
  )
}

export default Rating
