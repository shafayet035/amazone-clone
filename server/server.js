const express = require("express")
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HiitTBGurzF7kkBcI1JvTpG6Jr8vWGfRoMYCyMRNLvvJnfAQ8K3CDgnmduf3kG9eHKsLnAo7KhpuiyDhgPMYC9000lVr1aLxi')

//API

// app config
const app = express()

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get('/', (req, res) => {
    res.send('Whats up?')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
    console.log('Paymet Recieved total of', total)
})

const port = 5000

//Litsen Commands
app.listen(port, (req, res) => {
    console.log(`App Running Port${port}`)
})

// http://localhost:5001/e-clone-2c81e/us-central1/api