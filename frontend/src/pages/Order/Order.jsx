import React from 'react'
import './Order.css'

const Order = () => {
  return (
    <form action="">
        <h2>Order Page</h2>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' type="text"  placeholder='First name'/>
            <input name='lastName' type="text" placeholder='Last name' />
          </div>
          <input name='email'  type="email" placeholder='Email Address' />
          <input name='street'  type="text" placeholder='Street' />
          <div className="multi-fields">
            <input name='city'  type="text"  placeholder='City'/>
            <input name='state'  type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input name='zipcode'  type="text"  placeholder='Zip Code'/>
            <input name='country'  type="text" placeholder='Country' />
          </div>
          <input name='phone' type="text" placeholder='Phone' />
      </div>
    </form>
  )
}

export default Order