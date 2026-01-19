"use client"

import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { CheckIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { FaCheck } from "react-icons/fa"
import { useId } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const id = useId()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger id={`${id}-actions`} asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
          {theme === "light" && <FaCheck className="ml-5" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
          {theme === "dark" && <FaCheck className="ml-5" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
