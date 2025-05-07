const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });

const stripe = require('stripe')('sk_test_51RM9WqQc9p8NGwhTVWaT5PLExXNFPJBerqfEWc6TrtKhhQK7WBNtG0iSSs4MlRZWAGqTsimEecW1AF3cn39RGIMm00YDaNWQfJ');

exports.create_payment_intent = async (req, res) => {

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body,
            currency: 'gbp',
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        res.status(500).json({ message: 'Stripe connection error' });
    }

    console.log()
}