"use client"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { FiPlusCircle } from "react-icons/fi"
import { AiOutlineMinusCircle } from "react-icons/ai"

function ProductAmount({ prevAmount }: { prevAmount?: number }) {
  const initAmount = prevAmount ? prevAmount : 1

  const [amount, setAmount] = useState(initAmount)

  return (
    <>
      <h2>Amount :</h2>
      <div className="flex items-center gap-3 mt-3">
        <AiOutlineMinusCircle
          className="w-6 h-6 cursor-pointer"
          onClick={() => (amount > 1 ? setAmount(amount - 1) : setAmount(0))}
        />
        <Input
          name="amount"
          type="number"
          value={amount}
          min={1}
          readOnly
          onChange={(e) => {
            const val = parseInt(e.target.value)
            setAmount(isNaN(val) ? 0 : val)
          }}
          className="w-12"
        />

        <FiPlusCircle
          className="w-6 h-6 cursor-pointer"
          onClick={() => setAmount(amount + 1)}
        />
      </div>
    </>
  )
}

export default ProductAmount
