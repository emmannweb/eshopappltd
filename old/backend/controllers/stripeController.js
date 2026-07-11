const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.stripeCtrl = (req, res) => {

    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd'
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json({ message: stripeErr });
            } else {
                res.status(200).json({ success: true, message: stripeRes });
            }
        })
}
