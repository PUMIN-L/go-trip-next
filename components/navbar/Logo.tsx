import Link from "next/link"
import { Button } from "../ui/button"
import { FaTripadvisor } from "react-icons/fa";

function Logo() {
  return (
    <Button size='icon' variant="outline" asChild >
        <Link href='/' prefetch>
              <FaTripadvisor/>
        </Link>
    </Button>
  )
}

export default Logo