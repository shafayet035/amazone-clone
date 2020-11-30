import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from '../../firebase'
import { useStateValue } from '../../Store/StateProvide'
import Order from './Order/Order'

const Orders = () => {
    const [{cart, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState()

    useEffect(()=> {
        if(user) {
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }
       
    }, [user])

    return (
        <div className="orders">
            <h2>Your Orders</h2>
            <Order orders={orders}/>
        </div>
    )
}

export default Orders
