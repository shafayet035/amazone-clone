import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../Store/StateProvide'
import './Checkout.css'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from '../../Store/reducer'
import { useHistory } from 'react-router-dom'

const SubTotal = () => {
    const [{cart, user}, dispatch] = useStateValue()
    const [disable, setDisable] = useState(true)

    const history = useHistory()

    const gotoPayment = () => {
        if(user) {
            history.push('/payment')
        } else {
            history.push('/authentication')
        }
        
    }

    useEffect(() => {
        const disHandler = () => {
            if(cart.length > 0) {
                setDisable(false)
            } else {
                setDisable(true)
            }
        }
        disHandler()
    }, [cart])

    return (
        <div className="sub__total">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <h2>Subtotal ({cart?.length} item): {value}</h2>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <div className="sub__gift__check">
                <input type="checkbox" />
                <label>This Order Contains a gift</label>
            </div>
            <button disabled={disable} onClick={gotoPayment} className="subtotal__button">Proceed to Checkout</button>
        </div>
    )
}

export default SubTotal
