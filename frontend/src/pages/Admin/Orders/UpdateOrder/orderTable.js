import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { OrderContext } from '../../../../context/orderContext'

export const OrderTable = (props) => {
    const { isFetching } = useContext(OrderContext)
    const { orderModel, selectedStatus, setSelectedStatus, statusChangeHandler } = props.data

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        if (!isFetching) {
            setSelectedStatus(orderModel.status)
        }
        console.log('hi')


    }, [isFetching])


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    //loading status for fetching the order
    if (isFetching) {
        return <div>Loading...</div>
    }

    const orderId = orderModel.id.slice(-3)
    const customerId = orderModel.userId.slice(-3)
    const numItems = orderModel.totalProducts
    const shipFee = orderModel.shippingFee.toFixed(2)
    const totalPrice = orderModel.totalPrice.toFixed(2)


    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer ID</th>
                    <th># Of Items</th>
                    <th>Shipping Fee</th>
                    <th>Total Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{orderId}</td>
                    <td>{customerId}</td>
                    <td className="dropdown-container" onClick={toggleDropdown}>
                        <div className="dropdown" >
                            {numItems}
                            <div className={`dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                                {orderModel.items.map(item => (
                                    <p key={item.id}>
                                        <img src={item.imageUrl} alt={item.name} />
                                        {item.name} - ${item.price.toFixed(2)} x {item.amount}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </td>
                    <td>{shipFee}</td>
                    <td>${totalPrice}</td>
                    <td>
                        <select value={selectedStatus} onChange={statusChangeHandler} >
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETE">COMPLETE</option>
                        </select></td>
                </tr>

            </tbody>
        </table>
    )
}
