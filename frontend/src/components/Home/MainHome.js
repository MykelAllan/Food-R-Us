import React, { useContext, useEffect } from 'react'
import './main-home.css'
import { HeroBanner } from './Hero/Hero-Banner'
import { Collection } from './Collection/Collection'
import { ProductContext } from '../../context/productContext'
import { TodaysDeals } from './Products/TodaysDeals/TodaysDeals'

export const MainHome = () => {
    const { fetchDiscountedProducts, discountedProds } = useContext(ProductContext)

    useEffect(() => {
        fetchDiscountedProducts()
        console.log(discountedProds)

    }, [])

    return (
        <div className='home-container'>
            <section id='home' className='section'>
                <HeroBanner />
            </section>
            <section id='collection' className='section'>
                <Collection />
            </section>
            <section id='products' className='section'>
                <TodaysDeals data={{ discountedProds }} />
            </section>
        </div>
    )
}
