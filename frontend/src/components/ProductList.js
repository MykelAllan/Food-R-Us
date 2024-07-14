import React, { useContext, useEffect } from 'react'
import '../styles/products.css'

export const ProductList = (props) => {
    const { product, handleAddToCart, getCartItemAmount } = props.data
    const price = product.price.toFixed(2)
    return (
        <>
            <div className="card" key={product.id}>
                <div className='card-img'>
                    <img src={product.imageUrl} alt={product.name} />
                    <button onClick={() => handleAddToCart(product)} className='buy-icon'>
                        <box-icon color="#fff" name='plus'></box-icon>
                        Add {getCartItemAmount(product.id) > 0 && <>({getCartItemAmount(product.id)})</>}
                    </button>
                </div>
                <div className='card-text'>
                    <h3 className='card-title'>{product.name}</h3>
                    <p className='card-price'>${price}</p>
                </div>
            </div>
        </>
    )
}

