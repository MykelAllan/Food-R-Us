import React, { useContext, useState } from 'react'
import { ProductPrev } from './product-prev';
import { ProductForm } from './product-form';


import './productForm.css'
import { ProductContext } from '../../../../context/productContext';
import { useNavigate } from 'react-router-dom';

export const NewProduct = () => {
    const navigate = useNavigate()
    const { createNewProduct, product, setProduct } = useContext(ProductContext)
    const [currentPage, setCurrentPage] = useState("form");

    const submitHandler = async (e) => {
        //prevent the website from loading
        e.preventDefault()
        //save new product
        await createNewProduct(product);
        //set the new product to default after submiting
        setProduct({
            name: '',
            category: '',
            price: 0,
            discountPercentage: 0,
            discountedPrice: 0,
            imageUrl: ''
        })

        //go back to dashboard after creating a new product
        goBack();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const activeLinkHandler = (e, page) => {
        //removes active class
        document.querySelectorAll('.form-nav button').forEach(button => {
            button.classList.remove('active');
        })

        //adds the active class
        e.target.classList.add('active');

        //sets current page
        setCurrentPage(page)
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='new-product container'>
            <button className='admin-goBack-btn' onClick={goBack}>Go Back</button>
            <div className='form-container container'>
                <div className='form-nav container'>
                    <button className='active' onClick={(e) => activeLinkHandler(e, "form")}>Create Product</button>
                    <button onClick={(e) => activeLinkHandler(e, "prev")}>Preview Product</button>
                </div>
                {currentPage === "form" ? (<ProductForm product={product} submitHandler={submitHandler} handleChange={handleChange} />) : (<ProductPrev product={product} />)}
            </div>
        </div>
    )
}
