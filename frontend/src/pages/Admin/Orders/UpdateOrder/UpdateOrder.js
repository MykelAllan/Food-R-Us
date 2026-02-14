import React, { useContext, useEffect, useState } from 'react'
import './update-order.css'
import { useNavigate, useParams } from 'react-router-dom'
import { OrderTable } from './orderTable'
import { OrderContext } from '../../../../context/orderContext'


export const UpdateOrder = () => {
    const { fetchOrderById, orderModel, setOrderModel, saveStatusOrder } = useContext(OrderContext)
    const { orderId } = useParams()
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState();


    const statusChangeHandler = (e) => {
        const newStatus = e.target.value
        setSelectedStatus(newStatus)

        setOrderModel({
            ...orderModel,
            status: newStatus

        })
        console.log(newStatus, ':', selectedStatus)
    }

    const saveSubmitHandler = () => {
        console.log(orderModel)

        saveStatusOrder(orderId)

    }


    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        fetchOrderById(orderId)
        console.log('updating order id: ', orderModel)

    }, [])

    return (
        <div className='admin-update container'>
            <div className='admin-update-content'>
                <div className='admin-update-header'>
                    <button className='admin-goBack-btn' onClick={goBack}>Go Back</button>
                    <h2>Update Order</h2>
                </div>
                <div className='admin-table-body'>
                    <OrderTable data={{ orderModel, selectedStatus, setSelectedStatus, statusChangeHandler }} />
                </div>
                <div className='admin-update-btn'>
                    <button className='admin-goBack-btn update-btn' onClick={() => saveSubmitHandler()}>Update</button>
                </div>
            </div>


        </div>
    )
}
