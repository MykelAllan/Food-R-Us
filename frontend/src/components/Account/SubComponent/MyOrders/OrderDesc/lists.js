import React, { useState, useEffect } from 'react'

export const Lists = ({ data, index }) => {
    const [isOnSale, setOnSale] = useState(null)
    const img = data.imageUrl
    const name = data.name
    const quantity = data.amount
    const price = isOnSale ? `${data.discountedPrice.toFixed(2)} - On Sale` : data.price.toFixed(2)

    // regular price if a prod is on discount/sale
    const regPrice = data.price.toFixed(2)

    useEffect(() => {
        if (data.discountedPrice > 0) {
            setOnSale(true)
        }
    }, [])


    return (
        <div className='od-order-list'>
            <div className='od-order-list-img'>
                <img src={img} />
            </div>
            <div className='od-order-list-text'>
                <h3>Product Name: {name}</h3>
                <h3>Quantiy: {quantity}</h3>
                {isOnSale
                    ?
                    (<div>
                        <h3>Regular Price: ${regPrice}</h3>
                        <h3>New Price: ${price}</h3>
                    </div>)
                    : (<h3>Price: ${price}</h3>)
                }

            </div>
        </div >
    )
}
