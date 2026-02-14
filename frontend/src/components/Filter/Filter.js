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
    const [isMobileFilVisible, setMobileFilVisible] = useState(false)

    const changeHandler = (category, minPrice, maxPrice, priceSelected) => {
        const newCategory = category !== null ? category : selectedCategory;
        const newPrice = priceSelected !== null ? { min: minPrice, max: maxPrice, name: priceSelected } : selectedPrice;

        setSelectedCategory(newCategory);
        setSelectedPrice(newPrice);

        filterHandler(newCategory, newPrice.min, newPrice.max);
    };

    //toggle mobile filter
    const toggleMobileFilter = () => {
        const mobileFilter = document.getElementById('mobile-filter')
        const mobileFilOverlay = document.getElementById('filter-mobile-overlay')

        if (isMobileFilVisible) {
            mobileFilter.classList.add('active')
            mobileFilOverlay.classList.add('active')
            mobileFilOverlay.style.display = 'block'
            setMobileFilVisible(!isMobileFilVisible)
        } else {
            mobileFilter.classList.remove('active')
            mobileFilOverlay.classList.remove('active')
            mobileFilOverlay.style.display = 'none'
            setMobileFilVisible(!isMobileFilVisible)
        }



    }

    return (
        <div className='filter-container'>
            <div className='filter-toggle-open-btn' onClick={toggleMobileFilter}>
                <h2>Filter</h2>
                <div className='filter-open-btn' >
                    <box-icon size='md' name='filter'></box-icon>
                </div>
            </div>


            <div className='filter-all-container' id='mobile-filter'>
                <div className='filter-toggle-close-btn'>
                    <h2 className='filter-title'>Filter Products</h2>
                    <div className='filter-close-btn' onClick={toggleMobileFilter}>
                        <box-icon size='md' name='x'></box-icon>
                    </div>
                </div>

                <div className="filter-category-container">
                    <h3>Category</h3>
                    <CategoryButtons data={{ changeHandler, categories, selectedCategory }} />
                </div>
                <div className="filter-price-container">
                    <h3>Price</h3>
                    <PriceButtons data={{ changeHandler, prices, selectedPrice }} />
                </div>
            </div>
            <div className='filter-mobile-overlay' id='filter-mobile-overlay' onClick={toggleMobileFilter}></div>


        </div>
    );
}
