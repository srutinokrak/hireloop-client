import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Mail,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"

function formatAmount(amount: number | null, currency: string) {
  if (amount === null) {
    return "Not available"
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  })

  if (session.status === "open") {
    redirect("/payment")
  }

  const isPaid = session.status === "complete" && session.payment_status === "paid"
  const paymentIntent = session.payment_intent
  const transactionId =
    typeof paymentIntent === "string" ? paymentIntent : paymentIntent?.id
  const email = session.customer_details?.email ?? session.customer_email

  let verificationFailed = false

  if (isPaid) {
    try {
      await checkoutVerify(session_id)
    } catch (error) {
      verificationFailed = true
      console.error("Checkout verification failed:", error)
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#09090b] px-4 py-12 text-white sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto flex w-full max-w-xl flex-col items-center">
        <div className="mb-5 grid size-16 place-items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-lg shadow-emerald-950/30">
          {isPaid ? (
            <Check aria-hidden="true" className="size-8" strokeWidth={2.5} />
          ) : (
            <ShieldCheck aria-hidden="true" className="size-8" />
          )}
        </div>

        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
          <BadgeCheck aria-hidden="true" className="size-3.5" />
          {isPaid ? "Payment successful" : "Payment not confirmed"}
        </p>

        <section className="w-full rounded-2xl border border-white/10 bg-[#141416]/95 p-6 shadow-2xl shadow-black/40 sm:p-9">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {isPaid ? "Welcome to Hireloop Pro" : "We couldn’t confirm your payment"}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
              {!isPaid
                ? "Your payment is not marked as paid yet. If you were charged, please contact support before trying again."
                : verificationFailed
                  ? "Stripe confirmed your payment, but we couldn’t update your account automatically."
                  : "Your payment has been received. Your premium recruiting features are ready."}
            </p>
          </div>

          {isPaid && (
            <>
              <div className="my-7 rounded-xl border border-white/8 bg-white/[0.03] p-5 text-center">
                <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Amount paid
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {formatAmount(session.amount_total, session.currency ?? "usd")}
                </p>
                <p className="mt-1 text-sm text-zinc-400">Hireloop Pro</p>
              </div>

              <dl className="divide-y divide-white/8 rounded-xl border border-white/8 bg-black/20 px-4">
                <div className="flex items-start gap-3 py-4">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-emerald-400"
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs text-zinc-500">Transaction ID</dt>
                    <dd className="mt-1 break-all font-mono text-xs leading-5 text-zinc-200 sm:text-sm">
                      {transactionId ?? "Unavailable"}
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4 shrink-0 text-zinc-500"
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs text-zinc-500">Date</dt>
                    <dd className="mt-1 text-sm text-zinc-200">
                      {new Date(session.created * 1000).toLocaleDateString(
                        "en-US",
                        { dateStyle: "long" }
                      )}
                    </dd>
                  </div>
                </div>

                {email && (
                  <div className="flex items-center gap-3 py-4">
                    <Mail
                      aria-hidden="true"
                      className="size-4 shrink-0 text-zinc-500"
                    />
                    <div className="min-w-0 flex-1">
                      <dt className="text-xs text-zinc-500">Receipt email</dt>
                      <dd className="mt-1 break-all text-sm text-zinc-200">
                        {email}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>

              {verificationFailed && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm leading-5 text-amber-200"
                >
                  Stripe confirmed your payment, but we couldn’t update your
                  account automatically. Please contact support and include
                  your transaction ID.
                </p>
              )}
            </>
          )}

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/dashboard/seeker"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Go to your dashboard
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/browse-jobs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <BriefcaseBusiness aria-hidden="true" className="size-4" />
              Browse jobs
            </Link>
          </div>
        </section>

        <p className="mt-5 flex items-center gap-2 text-center text-xs text-zinc-600">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Payment processed securely by Stripe
        </p>
      </div>
    </main>
  )
}
