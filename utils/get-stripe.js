import {loadStripe} from "@stripe/stripe-js"  // Import the loadStripe function from stripe-js library
let stripePromise;  // Declare a variable to hold the Stripe object once initialized

const getStripe = () => {
    if(!stripePromise){
        // Initialize stripePromise with the Stripe object using the publishable key from environment variables
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise  // Return the initialized Stripe object
}

export default getStripe;  // Export the getStripe function for use in other parts of the application
