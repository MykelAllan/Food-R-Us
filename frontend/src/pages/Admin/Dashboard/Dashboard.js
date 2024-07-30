import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/authContext'
import { ProductContext } from '../../../context/productContext'
import { Pagination } from '../Pagination/Pagination'
import { AdminProducts } from '../Products/ProductsList/Products'
import { AdminUsers } from '../Users/Users'

import './dashboard.css'

export const Dashboard = () => {
    const { userRole } = useContext(AuthContext)
    const { fetchPaginatedProducts, paginatedProducts, totalPaginatedPages, totalProductItems } = useContext(ProductContext)
    const [currentPage, setCurrentPage] = useState('products')
    const navigate = useNavigate()
    const pagesArray = [];

    for (let i = 1; i <= totalPaginatedPages; i++) {
        pagesArray.push(i);
    }

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
            fetchPaginatedProducts(1)
        }
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='dashboard-title'>
                <div className='dashboard-back-icon' style={{ '--desc': '"Go Back"' }} onClick={goBack }>
                    <box-icon color='#fff'name='chevron-left' ></box-icon>
                </div>
                <h1>Admin Dashboard</h1>
            </div>

            <div className='dashboard-nav'>
                <button className='active' onClick={(e) => activeLinkHandler(e, "products")}>Access Products</button>
                <button onClick={(e) => activeLinkHandler(e, "users")}>Access Users</button>
            </div>
            <div className='dashboard-content'>
                <div>
                    <h4>Total Products: {totalProductItems}</h4>
                    <h4>Total Users: 0</h4>
                </div>
                {currentPage === "products" ?
                    <div>
                        <AdminProducts data={{ paginatedProducts }} />

                        <div className='dashboard-content-pagination'>
                            <Pagination data={{ pagesArray, totalPaginatedPages }} />
                        </div>
                    </div>
                    :
                    (<AdminUsers data={{}} />)}
            </div>



        </div>
    )

}