import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {assets} from '../../assets/assets'

const MyOrders = () => {

    const [data, setData] = useState([])
    const {url, token} = useContext(StoreContext)

    const fetchOrders = async () => {
        const res = await axios.post(url+"/api/order/userorders", {}, {headers:{token}})
        setData(res.data.data)
    }

    useEffect(()=>{
        if (token) {
            fetchOrders()
        }
    },[token])


  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, idx) => {
                return(
                    <div className="my-orders-order" key={idx}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, idx)=>{
                            if(idx === order.items.length-1){
                                return item.name+" X "+item.quantity
                            }else{
                                return item.name+" X "+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
                        <div>
                        <p>{order.address.firstName+" "+order.address.lastName} 
                            <p>{order.address.street+" "+order.address.city+" "+order.address.state+" "+order.address.country+" "+order.address.zipcode}</p> 
                            <p>{order.address.phone}</p> 
                        </p>
                        </div>                        
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders