import Logo from "./Logo"
import NavSearch from "./NavSearch"
import CartButton from "./CartButton"
import ModeToggle from "./ModeToggle"
import Container from "@/global/Container"
import LinkDropdown from "./LinksDropdown"

function Navbar() {
  return (
    <nav className="border-b  dark:bg-background ">
      <Container className="flex flex-col-reverse  sm:flex-row sm:justify-between sm:items-center gap-4 py-8 ">
        <div className=" hidden sm:block">
          <Logo />
        </div>
        <div className="mt-2 w-full sm:w-120 sm:mt-0  ">
          <NavSearch />
        </div>

        <div className="flex justify-between">
          <div className="sm:hidden">
            <Logo />
          </div>
          <div className="flex gap-5 items-center justify-end">
            <CartButton />
            <ModeToggle />
            <LinkDropdown />
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
