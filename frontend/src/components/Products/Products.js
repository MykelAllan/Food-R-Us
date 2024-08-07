import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import './products.css'


import { ProductList } from './ProductList';

import { CartContext } from '../../context/cartContext';
import { ProductContext } from '../../context/productContext';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


export const Products = ({ productName }) => {
    const { handleAddToCart, cartItems, fetchCart } = useContext(CartContext);
    const { products, category, priceRange, isProdFetch, fetchProducts, fetchProductsByName } = useContext(ProductContext)

    const [showProdDesc, setShowProdDesc] = useState(null)

    const getCartItemAmount = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);

        return cartItem ? cartItem.amount : 0;
    }

    const toggleProdDesc = (e, productId) => {
        e.stopPropagation()
        if (showProdDesc === productId) {
            setShowProdDesc(null)
        } else {
            setShowProdDesc(productId)
        }
    }

    useEffect(() => {
        if (productName !== null && productName !== undefined) {
            fetchProductsByName(productName)
            console.log('fetching products for', productName)
        } else {
            fetchProducts()
            console.log('fetching all products')
        }
        fetchCart()
    }, [productName])
    return (
        <div className='products-container'>
            <div className='products-content'>
                <div className='products-category-title'>
                    {/* All = Products; Fruits = Products - Fruits; etc... */}
                    <h3>
                        {category && priceRange.max
                            ? `Products - ${category} -$${priceRange.min} - $${priceRange.max}`
                            : category
                                ? `Products - ${category}`
                                : priceRange.max
                                    ? `Products - $${priceRange.min} - $${priceRange.max}`
                                    : 'Products'}
                    </h3>


                </div>
                <div className='cards'>
                    {isProdFetch ? (
                        <div className='fetching-products'>
                            <FallingLines
                                color="#1f4b2c"
                                width="100"
                                visible={isProdFetch}
                                ariaLabel="falling-circles-loading"
                            />
                            <h1>Fetching For Products</h1>
                        </div>
                    ) : (
                        products && products.length > 0 ? (
                            products.map((product) => (
                                <ProductList
                                    key={product.id}
                                    data={{ product, handleAddToCart, getCartItemAmount }}
                                    showProdDesc={showProdDesc === product.id}
                                    toggleProdDesc={(e) => toggleProdDesc(e, product.id)}
                                />
                            ))
                        ) : (
                            <h2>No products available</h2>
                        )
                    )}

                </div>
            </div>
        </div>
    )

}
