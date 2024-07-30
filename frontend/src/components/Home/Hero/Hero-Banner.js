import React, { useRef, useEffect } from 'react';
import '../main-home.css'; // Ensure CSS is imported
import { HeroLists } from './hero-lists'; // Ensure this path is correct

const heroData = [
    {
        "title": "Fresh Strawberries, Fresh Savings: Taste the Best of Nature!",
        "subheading": "Harvested at Peak Ripeness, Delivered to Your Doorstep. Enjoy Sweet, Juicy Strawberries Today!",
        "price": "Starting at $1.99",
        "imgSrc": "https://photo-cdn2.icons8.com/ribqDPi5AeRfgUo0VUJ5otUf2oCUYvzorG44wO2DdrY/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi85MWMyYjU5MTUx/NTY0ZWU2OTk1OThl/MTk5YjJjYTVkNy5q/cGc.jpg"
    },
    {
        "title": "Juicy Watermelons: Summer's Sweetest Treat",
        "subheading": "Bursting with Flavor and Hydration, Perfect for Hot Days. Freshly Harvested and Delivered to You!",
        "price": "Starting at $3.99",
        "imgSrc": "https://img.pikbest.com/wp/202347/watermelon-slice-vibrant-3d-banner-with-juicy-slices-a-refreshing-illustration-of-fresh-juice-and-fruit_9742320.jpg!w700wp"
    },
    {
        "title": "Quality Dairy: Pure and Fresh",
        "subheading": "From Milk to Cheese, Explore Our Range of Dairy Products for Every Need!",
        "price": "Starting at $4.99",
        "imgSrc": "https://img.freepik.com/free-photo/milk-cottage-cheese-dairy-products_23-2148211368.jpg?w=1060&t=st=1722291250~exp=1722291850~hmac=aa649f6db9fa9fcc2250f52d513098a1e09a18c40c61f8811474923732cd476e"
    }
];

export const HeroBanner = () => {
    

    return (
        <div className='hero-banner-container con'>
            <div className='hero-banner-slides' >
                <HeroLists heroData={heroData} />
            </div>
        </div>
    );
}
