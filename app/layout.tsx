import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Providers from "./providers"
import Container from "@/global/Container"
import { ClerkProvider } from "@clerk/nextjs"
import LoadingProviders from "@/context/loadingProviders"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Go Trip",
  description: "Just Enjoy Your Trip with Go Tripp"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <LoadingProviders>
            <Providers>
              <Navbar />
              <Container className="py-15 ">
                <Suspense fallback={null}>{children}</Suspense>
              </Container>
            </Providers>
          </LoadingProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}
