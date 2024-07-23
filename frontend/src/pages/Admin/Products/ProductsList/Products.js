import React from 'react'
import { AdminProductList } from './productList'

import '../../admin-lists.css'

export const AdminProducts = (props) => {
    const { products } = props.data
    return (
        <div className='admin-lists-content'>
            <table className='admin-lists-table'>
                <tr className='admin-lists-header'>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                {products.map((product) => (
                    <AdminProductList
                        key={product.id}
                        data={{ product }}

                    />
                ))}


            </table>
        </div>
    )
}
