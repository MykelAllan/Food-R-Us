import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import './products.css'


import { ProductList } from './ProductList';

import { CartContext } from '../../context/cartContext';
import { ProductContext } from '../../context/productContext';


export const Products = () => {
    const { addToCart, cartItems, fetchCart } = useContext(CartContext);
    const { products, category, priceRange, isProdFetch, fetchProducts } = useContext(ProductContext)
    const [showProdDesc, setShowProdDesc] = useState(null)

    const getCartItemAmount = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);

        return cartItem ? cartItem.amount : 0;
    }

    const handleAddToCart = (product) => {
        const newCartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            amount: 1,
            imageUrl: product.imageUrl,
        };
        addToCart(newCartItem);

    };

    const toggleProdDesc = (e, productId) => {
        e.stopPropagation()
        if (showProdDesc === productId) {
            setShowProdDesc(null)
        } else {
            setShowProdDesc(productId)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])
    return (
        <div className='products-container'>
            <div className='products-title'>
                <h1>Food - R - Us</h1>
            </div>
            <div className='products-content'>
                <div className='products-category-title'>
                    {/* All = Products; Fruits = Products - Fruits; etc... */}
                    <h3 className='categ-title'>{category ? `Products - ${category}` : 'Products'}</h3>
                </div>
                <div className='cards'>
                    {isProdFetch ? (
                        <div className='fetching-products'>
                            <FallingLines
                                color="#2525E3CC"
                                width="100"
                                visible={isProdFetch}
                                ariaLabel="falling-circles-loading"
                            />
                            <h1>Fetching For Products</h1>
                        </div>

                    ) : (
                        products.map((product) => (
                            <ProductList
                                key={product.id}
                                data={{ product, handleAddToCart, getCartItemAmount }}
                                showProdDesc={showProdDesc === product.id}
                                toggleProdDesc={(e) => toggleProdDesc(e, product.id)}
                            />
                        ))

                    )}
                </div>
            </div>
        </div>
    )

}
