import React from 'react'
import { useStateValue } from '../../Store/StateProvide'
import './Checkout.css'

const CheckoutList = ({id, title, price, image, rating, hidden}) => {
    const [{cart}, dispatch] = useStateValue()

    const removeItemFromCart = () => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART',
            id: id
        })
    }

    return (
        <div className="checkout__list">
            <div className="checkout__product">
                <div className="checkout__product__img">
                    <img src={image} alt="" />
                </div>
                <div className="checkout__product__details">
                    <div className="checkout__product__title">
                        <h3>{title}</h3>
                    </div>
                    <div className="checkout__product__rating">
                        {Array(rating).fill().map((_i, __i) => (
                            <p key={Math.random(10000)}>⭐</p>
                            ))}
                    </div>
                    <div className="checkout__product__price">
                        <p>${price}</p>
                    </div>
                    <div className="checkout_product_remove">
                        {!hidden && (
                            <button onClick={removeItemFromCart}>Remove Item</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutList
