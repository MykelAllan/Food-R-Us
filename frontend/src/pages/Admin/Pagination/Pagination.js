import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ProductContext } from '../../../context/productContext'
import { PageLists } from './page-lists'

import './paginations.css'

export const Pagination = (props) => {
    const { fetchPaginatedProducts, isProdFetch } = useContext(ProductContext)
    const { pagesArray, totalPaginatedPages } = props.data
    const [currentPage, setCurrentPage] = useState(1)



    const nextPage = () => {
        if (currentPage < totalPaginatedPages) {
            fetchPaginatedProducts(currentPage + 1)
            setCurrentPage(currentPage + 1)
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            fetchPaginatedProducts(currentPage - 1)
            setCurrentPage(currentPage - 1)
        }
    }

    const setPage = (pageNo) => {
        fetchPaginatedProducts(pageNo)
        setCurrentPage(pageNo)
    }

    return (
        <div className='pagination-container'>
            {!isProdFetch &&
                <>
                    <button className='pagination-btn' disabled={currentPage === 1} onClick={() => prevPage()}><box-icon name='chevron-left'></box-icon></button>
                    {pagesArray.map((page) => (
                        <PageLists key={page} data={{ currentPage, page, setPage }} />
                    ))}
                    <button className='pagination-btn' disabled={currentPage === totalPaginatedPages} onClick={() => nextPage()} ><box-icon name='chevron-right'></box-icon></button>
                </>
            }

        </div>
    )
}
