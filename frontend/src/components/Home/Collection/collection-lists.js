import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CollectionLists = ({ collectionData }) => {
    const navigate = useNavigate()
    return (
        <>
            {collectionData.map((item, index) => (
                <div className='collection-card' key={index}>
                    <div className='collection-texts'>
                        <h1 className='collection-title'>{item.title}</h1>
                        <p className='collection-subheading'>{item.description}</p>
                        <div className='collection-shop-btn'>
                            <button className='shop-btn' onClick={() => navigate('/shop')}>Shop Now</button>
                            <div className='shop-arrow-icon'>
                                <box-icon name='right-arrow-alt' ></box-icon>
                            </div>
                        </div>
                    </div>
                    <div className='collection-img'>
                        <img src={item.imgSrc} alt={`Slide ${index + 1}`} loading='lazy' />
                    </div>
                </div>
            ))}
        </>
    )
}
