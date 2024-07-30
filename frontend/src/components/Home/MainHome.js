import React from 'react'
import './main-home.css'
import { HeroBanner } from './Hero/Hero-Banner'
import { Collection } from './Collection/Collection'
export const MainHome = () => {
    return (
        <div className='home-container'>
            <section id='home' className='section'>
                <HeroBanner />
            </section>
            <section id='collection' className='section'>
                <Collection />
            </section>
        </div>
    )
}
