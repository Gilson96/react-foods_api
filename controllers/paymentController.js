const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });

const stripe = require('stripe')(`${process.env.Stripe_SECRET_KEY}`);

exports.create_payment_intent = async (req, res) => {
    const { total } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'gbp',
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        res.status(500).json({ message: 'Stripe connection error' });
    }
}