import Logo from "./Logo"
import NavSearch from "./NavSearch"
import CartButton from "./CartButton"
import ModeToggle from "./ModeToggle"
import Container from "@/global/Container"
import LinkDropdown from "./LinksDropdown"

function Navbar() {
  return (
    <nav className="border-b  bg-gray-50 dark:bg-background ">
      <Container className="flex flex-col sm:flex-row sm: justify-between sm:items-center flex-weap  gap-4 py-8">
        <Logo />
        <NavSearch />
        <div className="flex gap-5 items-center">
          <CartButton />
          <ModeToggle />
          <LinkDropdown />
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
