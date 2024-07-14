import React from 'react'

const categories = [
    { name: 'All', filter: '' },
    { name: 'Fruits', filter: 'fruit' },
    { name: 'Vegetables', filter: 'vegetable' },
    { name: 'Dairy', filter: 'dairy' },
];

export const CategoryButtons = ({ activeLinkHandler, filterHandler }) => {
    const handleClick = (e, filter) => {
        activeLinkHandler(e);
        filterHandler(filter);
    };
    return (
        <div className="categ-btns">
            {categories.map(category => (
                <button
                    key={category.name}
                    className={`btn ${category.filter === '' ? 'active' : ''}`}
                    onClick={(e) => handleClick(e, category.filter)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}
