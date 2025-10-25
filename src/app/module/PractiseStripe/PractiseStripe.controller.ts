import Stripe from "stripe";
import { envVers } from "../../config/env";


const stript = new Stripe(envVers.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover"
})