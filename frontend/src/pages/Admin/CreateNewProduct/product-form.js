import React from 'react'


import 'boxicons'
import './newproduct.css'

export const ProductForm = (props) => {
    const { product, handleChange, submitHandler } = props
    return (
        <div className='form-page container'>
            <div className='form-header'>
                <h1>Create New Product</h1>
            </div>

            <form className='form-inputs container' onSubmit={submitHandler}>
                <div className='form-input container'>
                    <label>Product Name</label>
                    <div className='icon'><box-icon size='s' color='#504a4a' name='purchase-tag' type='solid' ></box-icon></div>
                    <input required type="text" placeholder='Milk...' name="name" value={product.name} onChange={handleChange} />
                </div>

                <div className='form-input container'>
                    <label>Product Category</label>
                    <div className='icon'><box-icon color='#504a4a'  name='category' type='solid' ></box-icon></div>
                    <input required type="text" placeholder='Dairy...' name="category" value={product.category} onChange={handleChange} />
                </div>
                <div className='form-input container'>
                    <label>Product Price</label>
                    <div className='icon'><box-icon color='#504a4a'  name='dollar-circle' type='solid' ></box-icon></div>
                    <input required type="number" name="price" value={product.price} onChange={handleChange} />
                </div>
                <div className='form-input container'>
                    <label>Product Image URL</label>
                    <div className='icon'><box-icon color='#504a4a'  name='image-add' type='solid' ></box-icon></div>
                    <input required type="url" placeholder='https://' name="imageUrl" value={product.imageUrl} onChange={handleChange} />
                </div>

                <button className="submit-btn"type='submit'>Add Product</button>

            </form>

        </div>
    )
}
