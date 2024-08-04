import React, { useContext } from 'react'
import { AdminProductList } from './productList'

import '../../admin-lists.css'
import { ProductContext } from '../../../../context/productContext'
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'

export const AdminProducts = (props) => {
    const { deleteAProduct, isProdFetch } = useContext(ProductContext)
    const { paginatedProducts } = props.data

    const navigate = useNavigate();


    return (
        <div className='admin-lists-content'>
            <button onClick={() => navigate('/admin/add-product')} className='admin-create-button'>Add New Product</button>
            <table className='admin-lists-table'>
                <thead>
                    <tr className='admin-lists-header'>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
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
                            <h1>Fetching For Products</h1>
                        </div>
                    ) : (
                        paginatedProducts && paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <AdminProductList
                                    key={product.id}
                                    data={{ product, deleteAProduct }}
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

