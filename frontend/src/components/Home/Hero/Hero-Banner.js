import React, { useRef, useEffect } from 'react';
import '../main-home.css'; // Ensure CSS is imported
import { HeroLists } from './hero-lists'; // Ensure this path is correct

const heroData = [
    {
        "title": "Fresh Strawberries, Fresh Savings: Taste the Best of Nature!",
        "subheading": "Harvested at Peak Ripeness, Delivered to Your Doorstep. Enjoy Sweet, Juicy Strawberries Today!",
        "price": "Starting at $1.99",
        "imgSrc": "https://png.pngtree.com/png-vector/20240330/ourmid/pngtree-red-juice-splash-with-fresh-strawberries-png-image_12253449.png"
    },
    {
        "title": "Juicy Watermelons: Summer's Sweetest Treat",
        "subheading": "Bursting with Flavor and Hydration, Perfect for Hot Days. Freshly Harvested and Delivered to You!",
        "price": "Starting at $3.99",
        "imgSrc": "https://png.pngtree.com/png-clipart/20240218/original/pngtree-watermelon-fruits-ripe-and-juicy-leaf-on-branch-png-image_14353982.png"
    },
    {
        "title": "Quality Dairy: Pure and Fresh",
        "subheading": "From Milk to Cheese, Explore Our Range of Dairy Products for Every Need!",
        "price": "Starting at $4.99",
        "imgSrc": "https://png.pngtree.com/png-clipart/20230814/original/pngtree-different-types-of-dairy-products-milk-healthy-butter-vector-picture-image_10649621.png"
    }
];

export const HeroBanner = () => {
    

    return (
        <div className='hero-banner-container'>
            <div className='hero-banner-slides' >
                <HeroLists heroData={heroData} />
            </div>
        </div>
    );
}
