import React, { useState } from 'react'
import './Product.css'
import { useStateValue } from '../../Store/StateProvide'

const Product = ({image, title, price, rating, id}) => {
    const [{ cart }, dispatch] = useStateValue()
    const [added, setAdded] = useState(false)

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
        setAdded(true)
        setTimeout(() => {
            setAdded(false)
        }, [700])
    }

    return (
        <div className="product">
            <div className={`product_added ${added ? "active" : ""}`}>Added</div>
            <div className="product_div">
                <div className="product_image">
                    <img src={image} alt="" />
                </div>
                <div className="product_title">
                <h3>    
                    {title}
                </h3>
                </div>
                <div className="product_price">
                    $<span>{price}</span>
                </div>
                <div className="product_rating">
                    {Array(rating).fill().map((_i, __i) => (
                    <p key={Math.random()}>⭐</p>
                    ))}
                </div>
                <div className="product_button">
                    <button onClick={addToCart} >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
