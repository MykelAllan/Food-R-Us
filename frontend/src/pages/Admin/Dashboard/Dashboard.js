import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'
import { ProductContext } from '../../../context/productContext'
import { AdminProducts } from '../Products/ProductsList/Products'
import { AdminUsers } from '../Users/Users'

import './dashboard.css'

export const Dashboard = () => {
    const { userRole } = useContext(AuthContext)
    const { fetchProducts, products } = useContext(ProductContext)
    const [currentPage, setCurrentPage] = useState('products')
    const navigate = useNavigate()

    const activeLinkHandler = (e, page) => {
        //removes active class
        document.querySelectorAll('.dashboard-nav button').forEach(button => {
            button.classList.remove('active');
        })

        //adds the active class
        e.target.classList.add('active');

        //sets current page
        setCurrentPage(page)
    }


    //if not an admin redirect to home
    useEffect(() => {
        if (userRole !== 'ADMIN') {
            navigate('/')

        }
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='dashboard-nav'>
                <button className='active' onClick={(e) => activeLinkHandler(e, "products")}>Access Products</button>
                <button onClick={(e) => activeLinkHandler(e, "users")}>Access Users</button>
            </div>
            <div className='dashboard-content'>
                <div className='dashboard-title'>
                    <h1>Admin Dashboard</h1>
                </div>
                {currentPage === "products" ?
                    (<AdminProducts data={{ products }} />)
                    :
                    (<AdminUsers data={{ products }} />)}
            </div>
        </div>
    )

}