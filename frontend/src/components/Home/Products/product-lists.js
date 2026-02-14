import React, { useContext } from 'react';
import { CartContext } from '../../../context/cartContext';
import './home-prods-lists.css'

export const ProductsLists = (props) => {
    const { discountedProds = [] } = props.data;
    const { handleAddToCart } = useContext(CartContext)

    return (
        <div className='pd-cards-container'>
            {discountedProds.length > 0 ? (
                discountedProds.map((product, index) => (
                    <div className='pd-card' key={index}>
                        <div className='pd-card-content'>
                            <div className='pd-card-img'>

                                <img src={product.imageUrl} />
                            </div>
                            <div className='pd-card-text'>
                                {product.discountPercentage > 0 ?
                                    <h2 className='discounted-price'><span className='regular-price'>${product.price.toFixed(2)}</span>${product.discountedPrice.toFixed(2)}</h2>
                                    :
                                    <h2>${product.price.toFixed(2)}</h2>
                                }
                                <h3>
                                    {product.name}
                                </h3>

                            </div>
                        </div>
                        <div className='pd-card-add-to-cart' onClick={() => handleAddToCart(product)}>
                            <box-icon color='#fff' name='cart-add' ></box-icon>
                        </div>
                    </div>
                ))
            ) : (
                <div>No Products</div>
            )}
        </div >


    );
};
