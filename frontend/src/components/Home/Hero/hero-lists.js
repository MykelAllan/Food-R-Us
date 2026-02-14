import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroLists = ({ heroData }) => {
    const navigate = useNavigate()
    return (
        <>
            {heroData.map((item, index) => (
                <div className='hero-banner-slide' key={index}>
                    <div className='hero-texts'>
                        <h1 className='hero-title'>{item.title}</h1>
                        <p className='hero-subheading'>{item.subheading}</p>
                        <div className='hero-price-shop'>
                            <p className='hero-price'>{item.price}</p>
                            <button className='hero-shop-btn' onClick={() => navigate('/shop')}>Shop Now</button>
                        </div>
                        <div className='hero-price-shop-overlay'>
                            <p className='hero-price'>{item.price}</p>
                            <button className='hero-shop-btn' onClick={() => navigate('/shop')}>Shop Now</button>
                        </div>

                    </div>
                    <div className='hero-img'>
                        <img src={item.imgSrc} alt={`Slide ${index + 1}`} loading='lazy' />
                    </div>
                </div>
            ))}
        </>
    );
}
