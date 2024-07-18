import React, { useState } from 'react'
import './prod-desc.css'

import { TailSpin } from 'react-loader-spinner'

export const ProductDescription = (props) => {
    const { 
        product, toggleProdDesc, handleAddToCart, 
        isAdding, setIsAdding,
        isAdded, setIsAdded
    } = props.data

    const addToCartHandler = () => {
        setIsAdding(true)
        handleAddToCart(product);
        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(true);
        }, 1000);

    }

    return (
        <div className='prod-desc-container'>

            <div className='prod-desc-content'>

                <div className='prod-desc-img'>
                    <img className="prod-img" src={product.imageUrl} loading='lazy' />
                    <img className="prod-img-1" src={product.imageUrl} loading='lazy' />
                    <img className="prod-img-2" src={product.imageUrl} loading='lazy' />
                </div>
                <div className='prod-desc-text'>
                    <h1>{product.name}</h1>
                    <h2>${product.price.toFixed(2)}</h2>
                    <h3>{product.category}</h3>
                </div>
                <div className='prod-desc-toggle'>
                    <button onClick={addToCartHandler} disabled={isAdding || isAdded}>
                        {isAdding ? (
                            <TailSpin
                                visible={true}
                                height="20"
                                width="20"
                                color="#4d7111"
                                ariaLabel="tail-spin-loading"
                                radius="1"

                            />
                        ) : isAdded ? 'Added' : 'Add to Cart'}
                    </button>
                    <button onClick={toggleProdDesc}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
