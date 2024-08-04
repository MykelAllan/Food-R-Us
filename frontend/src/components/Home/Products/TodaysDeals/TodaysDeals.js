import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductsLists } from '../product-lists'

export const TodaysDeals = (props) => {
    const { discountedProds } = props.data
    const navigate = useNavigate()
    return (
        <div className='td-container con'>
            <div className='td-headline'>
                <h1>Today's Deals</h1>
                <div className='collection-shop-btn td'>
                    <button className='shop-btn' onClick={() => navigate('/shop')}>Shop Now</button>
                    <div className='shop-arrow-icon'>
                        <box-icon name='right-arrow-alt' ></box-icon>
                    </div>
                </div>
            </div>
            <div className='td-cards'>
                <ProductsLists data={{ discountedProds }} />
            </div>
        </div>
    )
}
