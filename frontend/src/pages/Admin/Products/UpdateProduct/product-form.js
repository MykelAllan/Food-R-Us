import React, { useEffect, useState } from 'react'

import 'boxicons'
import './discount-switch.css'

export const ProductForm = (props) => {
    const { product, setProduct, handleChange, handleBlur, submitHandler, isToggle, setToggle } = props.data



    const applyDiscountHandler = (e) => {
        const discountInput = document.getElementById('discount-input')
        if (e.target.checked) {
            setToggle(true)
            console.log('discount on')
            discountInput.style.display = 'flex';
        } else {
            console.log('discount off')
            setToggle(false)
            discountInput.style.display = 'none';
            setProduct({ ...product, discountPercentage: 0 })

        }
    }

    const toggleDiscountInput = () => {
        const discountInput = document.getElementById('discount-input')
        if (product.discountPercentage > 0) {
            setToggle(true)
            discountInput.style.display = 'flex';
        } else {
            setToggle(false)
            discountInput.style.display = 'none';
        }
    }

    useEffect(() => {
        toggleDiscountInput()
    }, [product])


    return (
        <div className='form-page container'>
            <div className='form-header'>
                <h1>Update Product</h1>
            </div>

            <form className='form-inputs container' onSubmit={submitHandler}>
                <div className='form-input container'>
                    <label>Product Name</label>
                    <div className='icon'><box-icon size='s' color='#504a4a' name='purchase-tag' type='solid' ></box-icon></div>
                    <input required type="text" placeholder='Milk...' name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className='form-input container'>
                    <label>Product Category</label>
                    <div className='icon'><box-icon color='#504a4a' name='category' type='solid' ></box-icon></div>
                    <input required type="text" placeholder='Dairy...' name="category" value={product.category} onChange={handleChange} />
                </div>
                <div className='form-input container'>
                    <label>Product Price</label>
                    <div className='icon'><box-icon color='#504a4a' name='dollar-circle' type='solid' ></box-icon></div>
                    <input required type="number" name="price" value={product.price} onChange={handleChange} />
                </div>
                <div className='form-input container'>
                    <label>Product Image URL</label>
                    <div className='icon'><box-icon color='#504a4a' name='image-add' type='solid' ></box-icon></div>
                    <input required type="url" placeholder='https://' name="imageUrl" value={product.imageUrl} onChange={handleChange} />
                </div>

                <div className='discount-switch'>
                    <label>Apply Discount</label>
                    <label class="switch">
                        <input id='discount-toggle' type="checkbox" checked={isToggle} onChange={(e) => applyDiscountHandler(e)} />
                        <span class="slider round"></span>
                    </label>
                </div>
                <div id='discount-input' className='form-input discount container'>
                    <label>Discount Percentage(%)</label>
                    <div className='icon'><box-icon color='#504a4a' name='discount' type='solid' ></box-icon></div>
                    <input required type="number" placeholder='0' name="discountPercentage"
                        value={product.discountPercentage}
                        onBlur={handleBlur}
                        onChange={handleChange} />
                </div>

                <button className="submit-btn" type='submit'>Update Product</button>

            </form>

        </div>
    )
}
