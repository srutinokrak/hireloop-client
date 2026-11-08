"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

function isLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  // console.log('use session in navbar',session);

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center justify-between rounded-2xl border border-white/6 bg-[#222] pr-2 pl-5 shadow-lg"
        >
          <Link
            href="/"
            aria-label="HireLoop home"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/hireloop-logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => {
                const active = isLinkActive(pathname, link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-sm transition-colors hover:text-white",
                        active ? "font-medium text-white" : "text-white/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mx-3 h-5 w-px bg-white/15" aria-hidden="true" />

            {session?.user ? (
              <>
                <span className="text-white">welcome, {session.user.name}</span>
                <Button
                  onClick={handleSignOut}
               
               
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-white font-bold hover:text-primary"
                  )}
                >
                  Sign Out
                </Button>
                
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-primary hover:text-primary"
                  )}
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className={cn(buttonVariants(), "rounded-xl")}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            {menuOpen ? (
              <XIcon aria-hidden="true" />
            ) : (
              <MenuIcon aria-hidden="true" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mt-2 rounded-2xl border border-white/6 bg-[#222] p-3 shadow-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(pathname, link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10 hover:text-white",
                        active
                          ? "bg-white/10 font-medium text-white"
                          : "text-white/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-primary hover:bg-white/10"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className={cn(buttonVariants(), "w-full rounded-xl")}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
