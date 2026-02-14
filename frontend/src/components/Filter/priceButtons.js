import React from 'react';

const PriceButtons = (props) => {
    const { changeHandler, prices, selectedPrice } = props.data;

    const handlePriceChange = (min, max, priceSelected) => {
        changeHandler(null, min, max, priceSelected);
    };

    return (
        <div className="filter-price-content">
            {prices.map(price => (
                <div key={price.id} className='filter-price'>
                    <input
                        type='radio'
                        id={`${price.id}`}
                        name='price'
                        checked={selectedPrice.name === price.name}
                        onChange={() => handlePriceChange(price.min, price.max, price.name)}
                    />
                    <label htmlFor={`${price.id}`}>{price.name}</label>
                </div>
            ))}
        </div>
    );
}

export { PriceButtons };
