import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import './prod-desc.css'

import { TailSpin } from 'react-loader-spinner'
import { AuthContext } from '../../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'

export const ProductDescription = (props) => {
    const { isLoggedIn } = useContext(AuthContext)
    const {
        product, toggleProdDesc, handleAddToCart,
        isAdding, setIsAdding,
        isAdded, setIsAdded
    } = props.data

    const navigate = useNavigate()

    const addToCartHandler = () => {
        // direct to login if user is not logged in
        if (!isLoggedIn) {
            navigate('/auth/login')
            toast.info("Sign In to add product to cart", {
                autoClose: 4000
            })
        } else {
            setIsAdding(true)
            handleAddToCart(product);
            setTimeout(() => {
                setIsAdding(false);
                setIsAdded(true);
            }, 1000);
        }


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
