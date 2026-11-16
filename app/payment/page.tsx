import {
  ArrowLeft,
  Check,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/browse-jobs"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to jobs
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Sparkles aria-hidden="true" className="size-6" />
          </div>
          <p className="text-sm font-medium text-primary">Hireloop Premium</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Unlock more opportunities
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            Upgrade your plan to apply for more jobs and keep your search
            moving.
          </p>
        </div>

        <section className="mx-auto grid max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl shadow-black/30 md:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-white/8 p-6 sm:p-8 md:border-r md:border-b-0">
            <p className="text-sm font-medium text-zinc-300">Your plan</p>
            <h2 className="mt-3 text-2xl font-semibold">Hireloop Pro</h2>
            <p className="mt-2 text-sm text-zinc-400">
              More applications. More chances to get hired.
            </p>

            <div className="my-7 flex items-end gap-2">
              <span className="text-4xl font-semibold">$9.99</span>
              <span className="pb-1 text-sm text-zinc-500">/ month</span>
            </div>

            <ul className="space-y-3">
              {[
                "Apply to more job opportunities",
                "Track your applications in one place",
                "Cancel your plan at any time",
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-emerald-400"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payment summary</h2>
              <CreditCard aria-hidden="true" className="size-5 text-zinc-400" />
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 text-zinc-400">
                <span>Hireloop Pro (monthly)</span>
                <span className="text-zinc-200">$9.99</span>
              </div>
              <div className="flex justify-between gap-4 text-zinc-400">
                <span>Tax</span>
                <span className="text-zinc-200">Calculated at checkout</span>
              </div>
              <div className="border-t border-white/8 pt-4">
                <div className="flex justify-between gap-4 font-medium">
                  <span>Total due today</span>
                  <span>$9.99</span>
                </div>
              </div>
            </div>

        

            <form action="/api/checkout_sessions" method="POST">
              <section>
         
                  <Button
                type="submit" role="link"
                    className="mt-7 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                 Checkout<span>$9.99</span>
                  </Button>
             
              </section>
            </form>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
              <ShieldCheck aria-hidden="true" className="size-4" />
              Secure payment checkout coming soon.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-600">
          You won&apos;t be charged until Stripe Checkout is connected.
        </p>
      </div>
    </main>
  )
}
