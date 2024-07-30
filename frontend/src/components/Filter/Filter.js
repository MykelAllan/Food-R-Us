import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/productContext';
import { CategoryButtons } from './categoryButtons';
import { PriceButtons } from './priceButtons';
import './filter.css';

const categories = [
    { id: 1, name: 'All', filter: '' },
    { id: 2, name: 'Fruits', filter: 'fruit' },
    { id: 3, name: 'Vegetables', filter: 'vegetable' },
    { id: 4, name: 'Dairy', filter: 'dairy' },
];

const prices = [
    { id: 5, name: 'All', filter: '' },
    { id: 6, name: '$0-$2.00', min: 0, max: 2 },
    { id: 7, name: '$2.00-$4.00', min: 2, max: 4 },
    { id: 8, name: '$4.00-$6.00', min: 4, max: 6 },
];

export const Filter = () => {
    const { filterHandler } = useContext(ProductContext);
    const [selectedCategory, setSelectedCategory] = useState('');//default filter value - all
    const [selectedPrice, setSelectedPrice] = useState({ min: null, max: null, name: 'All' });//default filter value - all

    const changeHandler = (category, minPrice, maxPrice, priceSelected) => {
        const newCategory = category !== null ? category : selectedCategory;
        const newPrice = priceSelected !== null ? { min: minPrice, max: maxPrice, name: priceSelected } : selectedPrice;

        setSelectedCategory(newCategory);
        setSelectedPrice(newPrice);

        filterHandler(newCategory, newPrice.min, newPrice.max);
    };

    return (
        <div className='filter-container'>
            <h2 className='filter-title'>Filter Products</h2>
            <div className="filter-category-container">
                <h3>Category</h3>
                <CategoryButtons data={{ changeHandler, categories, selectedCategory }} />
            </div>
            <div className="filter-price-container">
                <h3>Price</h3>
                <PriceButtons data={{ changeHandler, prices, selectedPrice }} />
            </div>
        </div>
    );
}
