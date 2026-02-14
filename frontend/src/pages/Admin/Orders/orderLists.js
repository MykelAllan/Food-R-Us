import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../../../context/orderContext'

export const AdminOrderLists = (props) => {
    const { order } = props.data
    const { deleteAnOrder } = useContext(OrderContext)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const navigate = useNavigate()

    // order info
    const orderID = order.id.slice(-3)
    const customerID = order.userId.slice(-3)
    const numOfItems = order.totalProducts
    const shippingFee = order.shippingFee > 0 ? `$${order.shippingFee.toFixed(2)}` : `Free`
    const totalPrice = order.totalPrice.toFixed(2)
    const orderDate = order.orderPlacedDate;
    const status = order.status




    const navigateToUpdate = () => {
        navigate(`/admin/update-order/${order.id}`)
    }

    //used for mobile to capitalize name & category
    const capFirstHandler = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <tr className='admin-lists'>
            <td data-label='Order ID' scope='row'>{capFirstHandler(orderID)}</td>
            <td data-label='Customer ID'>{capFirstHandler(customerID)}</td>
            <td data-label='Items'>{numOfItems}</td>
            <td data-label='Shipping Fee'>{shippingFee}</td>
            <td data-label='Total Price'>${totalPrice}</td>
            <td data-label='Order Date'>{orderDate}</td>
            <td data-label='Status'>{capFirstHandler(status)}</td>
            <td data-label='Actions'>
                <div className='admin-actions-icons'>
                    <div onClick={() => setShowConfirmation(true)} className='admin-icons delete'><box-icon color='#fff' name='trash' type='solid' ></box-icon></div>
                    <div onClick={navigateToUpdate} className='admin-icons update'><box-icon color='#fff' name='edit' type='solid' ></box-icon></div>
                </div>

                {showConfirmation && <DeleteConfirmation deleteOrderHandler={deleteAnOrder} orderId={order.id} setShowConfirmation={setShowConfirmation} />}</td>

        </tr >
    )
}


const DeleteConfirmation = ({ deleteOrderHandler, orderId, setShowConfirmation }) => (
    <div className='delete-confirmation-container'>
        <div className='delete-confirmation-content'>
            <h3>Are you sure?</h3>
            <div className='delete-confirmation-buttons'>
                <button onClick={() => {
                    deleteOrderHandler(orderId)
                    setShowConfirmation(false)
                }}>Delete</button>
                <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
        </div>
    </div >
);