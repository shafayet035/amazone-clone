import React, { useState } from 'react'
import Product from '../Product/Product'
import './Home.css'

const Home = () => {
    const [product, setProduct] = useState([
        {
            id: 1,
            title: "Acer Aspire 5 Slim Laptop, 15.6 inches Full HD IPS Display, AMD Ryzen 3 3200U, Vega 3 Graphics, 4GB DDR4, 128GB SSD, Backlit Keyboard, Windows 10 in S Mode, A515-43-R19L, Silver",
            image: "https://images-na.ssl-images-amazon.com/images/I/71vvXGmdKWL._AC_SX450_.jpg",
            price: 399,
            rating: 5, 
        },
        {
            id: 2,
            title: "AmazonBasics Wireless Computer Mouse with USB Nano Receiver - Black",
            image: "https://images-na.ssl-images-amazon.com/images/I/61LtuGzXeaL._AC_SX569_.jpg",
            price: 12.99,
            rating: 4, 
        },
        {
            id: 3,
            title: "TP-Link AC1750 Smart WiFi Router (Archer A7) - Dual Band Gigabit Wireless Internet Router for Home, Works with Alexa, VPN Server, Parental Control and QoS",
            image: "https://images-na.ssl-images-amazon.com/images/I/51R2a9p-vNL._AC_SX679_.jpg",
            price: 74,
            rating: 5, 
        },
        {
            id: 4,
            title: "HP VH240a 23.8-inch Full HD 1080p IPS LED Monitor with Built-in Speakers and VESA Mounting, Rotating Portrait & Landscape, Tilt, and HDMI & VGA Ports (1KL30AA) - Black",
            image: "https://images-na.ssl-images-amazon.com/images/I/71trhuzbhML._AC_SY741_.jpg",
            price: 156.49,
            rating: 5, 
        },
        {
            id: 5,
            title: "DualShock 4 Wireless Controller for PlayStation 4 - Magma Red",
            image: "https://images-na.ssl-images-amazon.com/images/I/81L9%2B4dTIgL._SX522_.jpg",
            price: 49,
            rating: 5, 
        },
        {
            id: 6,
            title: "RUNMUS Gaming Headset for PS4, Xbox One, PC Headset w/Surround Sound, Noise Canceling Over Ear Headphones with Mic & LED Light, Compatible with PS4, Xbox One, Switch, PC, PS3, Mac, Laptop",
            image: "https://images-na.ssl-images-amazon.com/images/I/81PtEw326aL._AC_SX425_.jpg",
            price: 69,
            rating: 5, 
        }
    ])


    return (
        <div className="home">
            <div className="banner_section"></div>
            <div className="product_section">
            { product.map(prd => {
                return (
                <Product
                    key={prd.id}
                    title={prd.title}
                    price={prd.price}
                    image={prd.image}
                    rating={prd.rating}
                    id={prd.id}
                />
                )     
             })
            }
            </div>
        </div>
    )
}

export default Home
