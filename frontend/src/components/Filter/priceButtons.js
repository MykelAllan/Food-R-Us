import React from 'react'

import './filter.css'

const prices = [
    { id: 5, name: 'All', filter: '' },
    { id: 6, name: '$0-$2.00', filter: '' },
    { id: 7, name: '$2.00-$4.00', filter: '' },
    { id: 8, name: '$4.00-$6.00', filter: '' },
];

export const PriceButtons = () => {
    return (
        <div className='filter-price-content'>
            {prices.map(price => (
                <div key={price.name} className='filter-price'>
                    <input value={`${price.id}`} type='radio' id={`${price.id}`} name='price' />
                    <label for={`${price.id}`} className='filter-button'>
                        {price.name}
                    </label>
                </div>
            ))}
        </div >
    )
}
