import React from 'react'

export const PageLists = (props) => {
    const { currentPage, page, setPage } = props.data
    return (
        <button disabled={currentPage === page} className='pagination-btn list' onClick={() => setPage(page)}>{page}</button>
    )
}
