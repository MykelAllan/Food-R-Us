import React from 'react'

export const AdminProductList = (props) => {
    const { product } = props.data
    return (
        <tr className='admin-lists'>
            <th>{product.name}</th>
            <th>{product.category}</th>
            <th>${product.price.toFixed(2)}</th>
            <th><img src={product.imageUrl} /></th>
            <th>
                <div className='admin-actions-icons'>
                    <div className='admin-icons delete'><box-icon color='#fff' name='trash' type='solid' ></box-icon></div>
                    <div className='admin-icons update'><box-icon color='#fff' name='edit' type='solid' ></box-icon></div>
                </div>
            </th>
        </tr >
    )
}
