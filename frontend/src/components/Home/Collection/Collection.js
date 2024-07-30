import React from 'react'
import './collection.css'
import { CollectionLists } from './collection-lists'

const collectionData =
    [{
        "title": "Summer Fruits",
        "description": "Starting at $10.99",
        "imgSrc": "https://png.pngtree.com/png-vector/20240416/ourmid/pngtree-fruit-juice-splash-with-flying-fruits-png-image_12290367.png"
    },
    {

        "title": "Winter Vegetables",
        "description": "Starting at $11.99",
        "imgSrc": "https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-a-pile-of-fresh-vegetables-including-cauliflower-broccoli-and-carrots-png-image_12923506.png"
    },
    {
        "title": "Holiday Specials",
        "description": "Starting at $7.99",
        "imgSrc": "https://png.pngtree.com/png-clipart/20230206/ourmid/pngtree-fresh-fruit-cake-png-image_6586449.png"
    }]

export const Collection = () => {
    return (
        <div className='collection-container con'>
            <div className='collection-cards'>
                <CollectionLists collectionData={collectionData} />
            </div>
        </div>
    )
}
