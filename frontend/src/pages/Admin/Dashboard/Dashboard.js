import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/authContext'
import { ProductContext } from '../../../context/productContext'
import { Pagination } from '../Pagination/Pagination'
import { AdminProducts } from '../Products/ProductsList/Products'
import { AdminOrders } from '../Orders/Orders'

import './dashboard.css'
import { OrderContext } from '../../../context/orderContext'

export const Dashboard = () => {
    const { userRole } = useContext(AuthContext)
    const { fetchAllOrders, adminOrders } = useContext(OrderContext)
    const { fetchPaginatedProducts, paginatedProducts, totalPaginatedPages, totalProductItems } = useContext(ProductContext)
    const [currentPage, setCurrentPage] = useState('products')
    const navigate = useNavigate()
    const pagesArray = [];

    for (let i = 1; i <= totalPaginatedPages; i++) {
        pagesArray.push(i);
    }

    const activeLinkHandler = (e, page) => {
        //removes active class
        document.querySelectorAll('.dashboard-nav .nav-content .btn').forEach(button => {
            button.classList.remove('active');
        })

        //adds the active class
        e.target.classList.add('active');

        //sets current page
        setCurrentPage(page)
    }

    const goBack = () => {
        navigate(-1)
    }


    //if not an admin redirect to home
    useEffect(() => {
        if (userRole !== 'ADMIN') {
            navigate('/')
            toast.info("You're not an ADMIN", {
                autoClose: 4000
            })
        } else {
            fetchPaginatedProducts(1) //fetch paginated products page 1
            fetchAllOrders()

        }
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='dashboard-title'>
                <div className='dashboard-back-icon' style={{ '--desc': '"Go Back"' }} onClick={goBack}>
                    <box-icon color='#fff' name='chevron-left' ></box-icon>
                </div>
                <h1>Admin Dashboard</h1>
            </div>

            <div className='dashboard-nav'>
                <div className='nav-content' onClick={(e) => activeLinkHandler(e, "products")}>
                    <div className='nav-icon btn'><box-icon name='food-menu' type='solid' ></box-icon></div>
                    <button className='btn active'>Access Products</button>
                </div>
                <div className='nav-content' onClick={(e) => activeLinkHandler(e, "orders")}>
                    <div className='nav-icon btn'><box-icon type='solid' name='receipt'></box-icon></div>
                    <button className='btn'>Access Orders</button>
                </div>


            </div>
            <div className='dashboard-content'>
                <div className='dashboard-headers'>
                    <h4>Total Products</h4>
                    <h4>Total Orders</h4>
                    <h4>{totalProductItems}</h4>
                    <h4>{adminOrders.length}</h4>
                </div>
                {currentPage === "products" ?
                    <div className='prod-paginate'>
                        <AdminProducts data={{ paginatedProducts }} />

                        <div className='dashboard-content-pagination'>
                            <Pagination data={{ pagesArray, totalPaginatedPages }} />
                        </div>
                    </div>
                    :
                    (<AdminOrders data={{}} />)}
            </div>



        </div>
    )

}