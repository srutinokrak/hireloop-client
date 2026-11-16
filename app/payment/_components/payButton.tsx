"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";


// const [isStartingCheckout, setIsStartingCheckout] = useState(false)
// function handlePay() {
//     setIsStartingCheckout(true)
//     // Replace with the Stripe Checkout redirect when it is implemented.
//     setIsStartingCheckout(false)
//   }

{/* {isStartingCheckout ? "Preparing checkout..." : "Continue to payment"} */}
//   disabled={isStartingCheckout}
//   onClick={handlePay}
const PayButton = () => {
    return (
        <div>
              <Button
              type="button"
              className="mt-7 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >

              Continue to payment
            </Button>
        </div>
    );
};

export default PayButton   ;