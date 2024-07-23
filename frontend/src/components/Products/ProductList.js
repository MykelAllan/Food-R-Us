import React, { useContext, useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { CartContext } from '../../context/cartContext'

import { ProductDescription } from './ProductDescription'
import './products.css'

export const ProductList = (props) => {
    const { isAddCart } = useContext(CartContext)
    const { product, handleAddToCart, getCartItemAmount } = props.data
    const { showProdDesc, toggleProdDesc } = props;

    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)


    const price = product.price.toFixed(2)


    return (
        <>
            <div className="card" key={product.id} >
                <div className='card-img' >
                    <img src={product.imageUrl} alt={product.name} />
                    <button onClick={() => handleAddToCart(product)} className='buy-icon'>
                        <box-icon color="#fff" name='plus'></box-icon>
                        Add {isAddCart ? (
                            <Rings
                                visible={isAddCart}
                                height="20"
                                width="20"
                                color="#fff"
                                ariaLabel="rings-loading"
                                wrapperStyle={{}}
                            />
                        ) : (
                            getCartItemAmount(product.id) > 0 && <>({getCartItemAmount(product.id)})</>
                        )}
                    </button>

                </div>
                <div className='card-text' onClick={toggleProdDesc}>
                    <h3 className='card-title'>{product.name}</h3>
                    <p className='card-price'>${price}</p>
                </div>
            </div>
            {showProdDesc && (
                <ProductDescription data={
                    {
                        product, toggleProdDesc, handleAddToCart,
                        isAdding, setIsAdding,
                        isAdded, setIsAdded
                    }
                } />

            )}
        </>
    )
}
