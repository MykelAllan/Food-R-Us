import React, { useContext, useState, useEffect } from 'react'
import { ProductPrev } from './product-prev';
import { ProductForm } from './product-form';

import { ProductContext } from '../../../../context/productContext';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateProduct = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { productById, product, setProduct, saveProduct } = useContext(ProductContext)
    const [currentPage, setCurrentPage] = useState("form");
    const [isToggle, setToggle] = useState(false);

    const submitHandler = async (e) => {
        //prevent the website from loading
        e.preventDefault()

        //save new product
        saveProduct(productId, product)

        //set the new product to default after submiting
        setProduct({
            name: '',
            category: '',
            price: 0,
            discountPercentage: 0,
            discountedPrice: 0,
            imageUrl: ''
        })

        goBack(); // go back to dashboard after saving
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value >= 0) {
            setProduct({ ...product, [name]: value })
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value === '') {
            setProduct({ ...product, [name]: 0 })
        }
    };

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

    useEffect(() => {
        productById(productId)

    }, [])


    return (
        <div className='new-product container'>
            <button className='admin-goBack-btn' onClick={goBack}>Go Back</button>
            <div className='form-container container'>
                <div className='form-nav container'>
                    <button className='active' onClick={(e) => activeLinkHandler(e, "form")}>Update Product</button>
                    <button onClick={(e) => activeLinkHandler(e, "prev")}>Preview Product</button>
                </div>
                {currentPage === "form" ? (<ProductForm data={{ product, setProduct, isToggle, setToggle, submitHandler, handleChange, handleBlur }} />) : (<ProductPrev product={product} />)}
            </div>
        </div>
    )
}
