import React from 'react'


export const ProductPrev = (props) => {
    const { product } = props
    return (
        <div className='prev-page container'>
            <div className='prev-header'>
                <h1>Preview Product</h1>
            </div>

            <div className='prev-container container'>
                <div className='img-container container'>
                    {product.imageUrl !== '' ? (<img src={product.imageUrl} alt="Image Preview" />) : (<span>No Image</span>)}
                </div>

                <div className='prev-text container'>
                    <h1>Name: <span>{product.name}</span></h1>
                    <h1>Category: <span>{product.category}</span></h1>
                    <h1>Price: <span>${product.price.toFixed(2)}</span></h1>
                </div>

            </div>



        </div>
    )
}
