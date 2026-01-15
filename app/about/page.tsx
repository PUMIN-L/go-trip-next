import React from "react"

function page() {
  return (
    <div className="grid grid-cols-3 gap-4 h-96">
      <div className="border w-full bg-red-200 min-h-24">01</div>
      <div className="border w-full bg-red-200 min-h-24">02</div>
      <div className="border w-full bg-red-200 min-h-24">03</div>
      <div className="col-span-2 border w-full bg-red-200 min-h-24">04</div>
      <div className="border w-full bg-red-200 min-h-24">05</div>
      <div className="border w-full bg-red-200 min-h-24">06</div>
      <div className="col-span-2 border w-full bg-red-200 min-h-24">07</div>
    </div>
  )
}

export default page
