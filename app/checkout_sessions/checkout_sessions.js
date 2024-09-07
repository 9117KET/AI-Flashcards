import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { plan } = req.body;
        const price = plan === 'pro' ? 10 : plan === 'basic' ? 5 : 0;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
                        },
                        unit_amount: formatAmountForStripe(price), // Using the function for consistency
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
            });
            res.status(200).json({ sessionId: session.id });
        } catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}