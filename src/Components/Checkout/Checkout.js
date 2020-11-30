import React from 'react'
import { useStateValue } from '../../Store/StateProvide'
import './Checkout.css'
import CheckoutList from './CheckoutList'
import SubTotal from './SubTotal'

const Checkout = () => {
    const [{cart}, dispatch] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkout_product_parent">
              <h2>Shopping Cart</h2>
                {
                    cart.map(item => (
                        <CheckoutList key={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            id={item.id}
                        />
                    ))}
            </div>
            
            <SubTotal />
        </div>
    )
}

export default Checkout
