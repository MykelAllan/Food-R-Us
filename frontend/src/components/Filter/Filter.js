import React, { useContext } from 'react'
import { ProductContext } from '../../context/productContext';

import { CategoryButtons } from './categoryButtons'
import { PriceButtons } from './priceButtons';

import './filter.css'


export const Filter = () => {
    const { filterHandler } = useContext(ProductContext)
    const defaultFilterProduct = '' //all
    return (
        <div className='filter-container'>
            <h2 className='filter-title'>Filter Products</h2>
            <div className="filter-category-container">
                <h3>Category</h3>
                <CategoryButtons data={{ filterHandler, defaultFilterProduct }} />
            </div>
            <div className="filter-price-container">
                <h3>Price</h3>
                <PriceButtons />
            </div>
        </div>
    )
}
