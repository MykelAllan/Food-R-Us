import React, { useContext, useState } from 'react'
import { ProductPrev } from './product-prev';
import { ProductForm } from './product-form';


import './newproduct.css'
import { ProductContext } from '../../../../context/productContext';



export const NewProduct = () => {
    const { message, createNewProduct } = useContext(ProductContext)
    //product model
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: 0,
        imageUrl: ''
    });

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
            imageUrl: ''
        })
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

    return (
        <div className='new-product container'>
            <div className='form-container container'>

                <div className='form-nav container'>
                    <button className='active' onClick={(e) => activeLinkHandler(e, "form")}>Create Product</button>
                    <button onClick={(e) => activeLinkHandler(e, "prev")}>Preview Product</button>
                </div>
                {/* message */}
                {message && (
                    <div className="message">
                        <p>{message}</p>
                    </div>
                )}


                {currentPage === "form" ? (<ProductForm product={product} submitHandler={submitHandler} handleChange={handleChange} />) : (<ProductPrev product={product} />)}
            </div>
        </div>
    )
}
