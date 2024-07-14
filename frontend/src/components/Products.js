import React, { useContext, useEffect } from 'react'

import '../styles/products.css'

import { CategoryButtons } from './CategoryButtons';

import { AppContext } from '../context/context'
import { ProductList } from './ProductList';

export const Products = () => {
    const { products, addToCart, cartItems, fetchProducts, filterHandler } = useContext(AppContext);

    const getCartItemAmount = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);

        return cartItem ? cartItem.amount : 0;
    }

    const activeLinkHandler = (e) => {
        //removes active class
        document.querySelectorAll('.categ-btns .btn').forEach(button => {
            button.classList.remove('active');
        })

        //adds the active class
        e.target.classList.add('active');
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

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='wrapper'>
            <div className='headline'>
                <h2>Products List</h2>
                <div className="filter-container">
                    <div className="input">
                        <input placeholder='Enter Category' />
                    </div>
                    <CategoryButtons activeLinkHandler={activeLinkHandler} filterHandler={filterHandler} />
                </div>

            </div>
            <div className='cards'>
                {products.length <= 0 ? (
                    <h1>No Product</h1>

                ) : (
                    products.map((product) => (
                        <ProductList data={{ product, handleAddToCart, getCartItemAmount }} />
                    ))

                )}
            </div>
        </div>
    )

}
