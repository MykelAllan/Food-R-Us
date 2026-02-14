import React, { useState } from 'react'
import './delete-confirmation.css'
import { useNavigate } from 'react-router-dom'

export const AdminProductList = (props) => {
    const { product, deleteAProduct } = props.data
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate()

    const navigateToUpdate = () => {
        navigate(`/admin/update-product/${product.id}`)
    }

    //used for mobile to capitalize name & category
    const capFirstHandler = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (

        <tr className='admin-lists'>
            <td data-label='Name' scope='row'>{capFirstHandler(product.name)}</td>
            <td data-label='Category'>{capFirstHandler(product.category)}</td>
            <td data-label='Price'>
                {product.discountPercentage > 0 ?
                    <label className='discounted-price'><span className='regular-price'>${product.price.toFixed(2)}</span>${product.discountedPrice.toFixed(2)}</label>
                    :
                    <label>${product.price.toFixed(2)}</label>
                }

            </td>
            <td data-label='Image' className='admin-list-price-tag'>
                {product.discountPercentage > 0 && <label className='discount-tag'>{product.discountPercentage.toFixed(2)}%</label>}
                <img src={product.imageUrl} />
            </td>
            <td data-label='Actions'>
                <div className='admin-actions-icons'>
                    <div onClick={() => setShowConfirmation(true)} className='admin-icons delete'><box-icon color='#fff' name='trash' type='solid' ></box-icon></div>
                    <div onClick={navigateToUpdate} className='admin-icons update'><box-icon color='#fff' name='edit' type='solid' ></box-icon></div>
                </div>

                {showConfirmation && <DeleteConfirmation deleteAProduct={deleteAProduct} productId={product.id} setShowConfirmation={setShowConfirmation} />}
            </td>
        </tr >


    )
}

const DeleteConfirmation = ({ deleteAProduct, productId, setShowConfirmation }) => (
    <div className='delete-confirmation-container'>
        <div className='delete-confirmation-content'>
            <h3>Are you sure?</h3>
            <div className='delete-confirmation-buttons'>
                <button onClick={() => deleteAProduct(productId)}>Delete</button>
                <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
        </div>
    </div >
);