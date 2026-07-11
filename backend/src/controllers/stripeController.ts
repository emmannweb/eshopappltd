const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { Request, Response } from "express";

const toStripeAmount = (value: number | string | undefined) => {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.round((numericValue + Number.EPSILON) * 100);
};

export const stripeController = async (req: Request, res: Response) => {
  console.log("req body", req.body);

  const line_items = req.body.cartItems.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.product,
          },
        },
        unit_amount: toStripeAmount(item.price),
      },
      quantity: Number(item.quantity) || 1,
    };
  });

  const shippingAndTax = toStripeAmount(
    Number(req.body.shippingPrice) + Number(req.body.taxPrice),
  );

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",

    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: shippingAndTax,
            currency: "usd",
          },
          display_name: "Shipping + taxes",
        },
      },
    ],

    success_url: `${process.env.DOMAIN}/checkout?success=true`,
    cancel_url: `${process.env.DOMAIN}/payment?cancel=true`,
  });

  res.send({ url: session.url });
};
