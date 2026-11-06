import Image from "next/image"
import Link from "next/link"
import { BriefcaseIcon, MapPinIcon, SearchIcon } from "lucide-react"

// Small pills shown under the search bar.
const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

// Shared styles for the two inputs inside the search bar.
const searchInputClass =
  "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-52 sm:px-6">
      {/* Soft purple glow behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-96 w-[80%] max-w-2xl rounded-full bg-[radial-gradient(ellipse,rgba(108,93,255,0.18),transparent_70%)]"
      />

      {/* Globe image peeking at the bottom (cropped like in the design) */}
      <Image
        src="/hero-globe.png"
        alt=""
        width={1440}
        height={1129}
        aria-hidden
        className="pointer-events-none absolute -bottom-[19rem] left-1/2 w-[640px] max-w-none -translate-x-1/2 select-none mix-blend-screen"
      />

      {/* All content above the images */}
      <div className="relative mx-auto flex w-full flex-col items-center text-center">
        {/* Badge */}
        <p className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1a1c] py-1.5 pr-4 pl-1.5 font-mono text-xs">
          <span className="flex size-5 items-center justify-center rounded-md bg-[#ff6a49]/15">
            <BriefcaseIcon className="size-3 text-[#ff8a75]" aria-hidden />
          </span>
          <span className="font-medium text-[#fb8a8a]">50,000+</span>
          <span className="tracking-widest text-muted-foreground">
            NEW JOBS THIS MONTH
          </span>
        </p>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mt-10 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#161616]/90 p-2 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              type="text"
              name="q"
              placeholder="Job title, skill or company"
              className={searchInputClass}
            />
          </div>

          <div className="hidden h-6 w-px bg-border sm:block" aria-hidden />

          <div className="flex flex-1 items-center gap-2 px-3">
            <MapPinIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className={searchInputClass}
            />
          </div>

          <button
            type="submit"
            aria-label="Search jobs"
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-transparent bg-primary text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none sm:ml-2"
          >
            <SearchIcon className="size-4" aria-hidden />
          </button>
        </form>

        {/* Trending pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Trending Position</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href="/jobs"
              className="rounded-full border border-white/10 bg-[#1a1a1c] px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
