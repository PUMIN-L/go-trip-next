"use client"
import { Button } from "@/components/ui/button"
import { adminLinks } from "@/utils/links"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href
        const variant = isActivePage ? "default" : "ghost"
        return (
          <Button
            asChild
            className="w-full grid grid-cols-1 sm:w-full mb-2 capitalize font-normal justify-start"
            variant={variant}
            key={link.id}
          >
            <Link key={link.id} href={link.href} prefetch>
              {link.label}
            </Link>
          </Button>
        )
      })}
    </aside>
  )
}
