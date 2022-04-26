const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.stripeCtrl = (req, res) =>{

    // const body = {
    //     source: req.body.token.id,
    //     amout: req.body.amount,
    //     currency: 'usd'
    // }

    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd'
        },
         (stripeErr, stripeRes)=>{
        if (stripeErr){
            res.status(500).json({message: stripeErr});
        } else{
            res.status(200).json({success: true, message: stripeRes}) ;
        }
    })
}
