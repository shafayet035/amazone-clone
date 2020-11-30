import React from 'react'
import './Order.css'
import moment from 'moment'
import CheckoutList from '../../Checkout/CheckoutList'
import CurrencyFormat from 'react-currency-format'

const Order = ({ orders }) => {
    return (
        <div className="order">
            {
                orders?.map(order => (
                    <div key={order.id} className="sing__order">
                        <p className="order_date">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                        <p className="order_id">
                           Order id : <small>{order.id}</small>
                        </p>
                        {
                            order.data.cart?.map(item => ( 
                                <div key={item.id}> 
                                    <CheckoutList 
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                        hidden={true}
                                    />
                                </div>
                            ))
                        }
                        
                        <CurrencyFormat 
                            renderText={(value) => (
                                <h5 className="order__total">Order Total: {value}</h5>
                            )}
                            decimalScale={2}
                            value={order.data.amount / 100}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                     </div>   
                ))
             }
        </div>
    )
}

export default Order
