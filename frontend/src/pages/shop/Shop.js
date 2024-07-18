import React from 'react'

import { Products } from '../../components/Products/Products'
import { Filter } from '../../components/Filter/Filter'

import './shop.css'

export const Shop = () => {


  return (
    <div className='shop-container'>
      <div className='shop-content'>
        <Filter />
        <Products />
      </div>
    </div>
  )
}
