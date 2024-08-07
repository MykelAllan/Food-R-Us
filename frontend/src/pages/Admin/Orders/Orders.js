import React, { useContext } from 'react'
import { AdminOrderLists } from './orderLists'


import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { ProductContext } from '../../../context/productContext'
import { OrderContext } from '../../../context/orderContext'

export const AdminOrders = () => {
  const { isProdFetch } = useContext(ProductContext)
  const { adminOrders } = useContext(OrderContext)
  const navigate = useNavigate()

  return (
    <div className='admin-lists-content'>
      <table className='admin-lists-table'>
        <thead>
          <tr className='admin-lists-header'>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Items</th>
            <th>Status</th>
            <th>Shipping Fee</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isProdFetch ? (
            <div className='fetching-products'>
              <FallingLines
                color="#1f4b2c"
                width="100"
                visible={isProdFetch}
                ariaLabel="falling-circles-loading"
              />
              <h1>Fetching For Orders</h1>
            </div>
          ) : (
            adminOrders && adminOrders.length > 0 ? (
              adminOrders.map((order, index) => (
                <AdminOrderLists
                  key={index}
                  data={{ order }}
                />
              ))
            ) : (
              <h2>No products available</h2>
            )
          )}
        </tbody>
      </table>


    </div>
  )
}
