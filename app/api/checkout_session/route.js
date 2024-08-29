import { NextResponse } from "next/server"
import Stripe from "stripe"
// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)

// Helper function to format amount for Stripe (converts to smallest currency unit)
const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
}

// POST handler for creating a Stripe checkout session
export async function POST(request){
    try {
        // Define the parameters for the checkout session
        const params = {
            submit_type: 'subscription', // Type of submission
            payment_method_types: ['card'], // Allowed payment methods
            line_items: [ // Products included in the checkout
              {
                price_data: {
                    currency: 'usd', // Currency
                    product_data: {
                        name: 'Pro-Subscription' // Product name
                    },
                    unit_amount: formatAmountForStripe(10, 'usd'), // Price per unit
                    recurring: { // Subscription details
                        interval: 'month', // Billing interval
                        interval_count: 1, // Number of intervals (e.g., 1 month)
                    }
                },
                quantity: 1, // Number of units of the product
              },
            ],
            success_url: `${request.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`, // URL to redirect to on success
            cancel_url: `${request.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`, // URL to redirect to on cancellation
          };
          // Create the checkout session with the defined parameters
          const checkoutSession = await stripe.checkout.sessions.create(params);
   
          // Return the session details as JSON
          return NextResponse.json(checkoutSession)
    } catch (error) {
        // Log and return error details if the session creation fails
        console.error('Failed to create checkout session:', error);
        return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}