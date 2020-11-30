import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from '../../Store/reducer'
import { useStateValue } from '../../Store/StateProvide'
import './Payment.css'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'

const Payment = () => {
    const [{cart, user}, dispatch] = useStateValue()
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    
    useEffect(() => {
        const getClientSecret = async () =>{
            const response = await axios ({
                method: 'post',
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            })
           setClientSecret(response.data.clientSecret) 
        }

        getClientSecret()
    }, [cart])

    const stripe = useStripe();
    const elements = useElements()

    const handlePaymentSubmit = async (event) =>{
        event.preventDefault();
        if(email && name && number && address && zipCode ) {
            setProcessing(true)

            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) => {

                db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id)
                .set({
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                    customer: {
                        email: email,
                        name: name,
                        phone: number,
                        address: address,
                        zipcode: zipCode
                    }
                })

                setSucceeded(true);
                setError(null);
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_CART'
                })

                history.replace('/orders')
            }).catch(err => {
                alert(err)
                setProcessing(false)
            })
        } else {
            alert('Please Fill the Form')
        }
    }

    const cardChangeHand = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_form">
             <h2>Customer Information</h2>
              <form>
                  <label>Full Name</label>
                  <input 
                    onChange={(e) => setName(e.target.value)} 
                    type="text"
                    value={name} />
                  <label>Email Address</label>
                  <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email" />
                  <label>Phone Number</label>
                  <input
                    onChange={(e) => setNumber(e.target.value)}
                    value={number} 
                    type="number" />
                  <label>Address</label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address} 
                    type="text" />
                  <label>ZipCode/Postal Code</label>
                  <input
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode} 
                    type="text" />
              </form>
            </div>
            <div className="payment_proccess">
                <form onSubmit={handlePaymentSubmit}>
                    <h3>Payment Method</h3> <br/>
                    <span className="span">Test Card: 42424242....</span>
                    <CardElement onChange={cardChangeHand}/>
                    <div className="payment_total_price">
                    <CurrencyFormat 
                        renderText={(value) => (
                            <>
                             <h5>Subtotal ({cart?.length} item): {value}</h5>
                            </>
                        )}
                        decimalScale={2}
                        value={getCartTotal(cart)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    <button className="payment_buy_button" disabled={processing || disabled || succeeded}>
                        <span>{processing ? "Processing": "Buy Now"}</span>    
                    </button>
                    </div> 
                    {error && <div>{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default Payment
