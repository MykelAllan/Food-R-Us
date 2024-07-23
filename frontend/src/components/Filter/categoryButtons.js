import React, {useState} from 'react'

import './filter.css'

const categories = [
    { id: 1, name: 'All', filter: '' },
    { id: 2, name: 'Fruits', filter: 'fruit' },
    { id: 3, name: 'Vegetables', filter: 'vegetable' },
    { id: 4, name: 'Dairy', filter: 'dairy' },
];

export const CategoryButtons = (props) => {
    const { filterHandler, defaultFilterProducts } = props.data
    const [selectedFilter, setSelectedFilter] = useState('');//default filter - all

    const changeHandler = (filter) => {
        setSelectedFilter(filter);
        filterHandler(filter);
    };

    return (
        <div className="filter-category-content">
            {categories.map(category => (
                <div key={category.name} className='filter-category'>
                    <input type='radio' id={`${category.id}`} name='category'
                        checked={selectedFilter === category.filter}
                        onChange={() => changeHandler(category.filter)}
                    />
                    <label htmlFor={`${category.id}`}>{category.name}</label>
                </div>
            ))}
        </div>
    )
}
