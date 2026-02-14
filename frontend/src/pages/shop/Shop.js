import React, { useEffect } from 'react'

import { Products } from '../../components/Products/Products'
import { Filter } from '../../components/Filter/Filter'

import './shop.css'
import { useParams } from 'react-router-dom'

export const Shop = () => {
  const { productName } = useParams()

  return (
    <div className='shop-container'>
      <div className='shop-content'>
        <Filter />
        <Products productName={productName} />
      </div>
    </div>
  )
}
