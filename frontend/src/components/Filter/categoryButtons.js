import React from 'react';

const CategoryButtons = (props) => {
    const { changeHandler, categories, selectedCategory } = props.data;

    const handleCategoryChange = (category) => {
        changeHandler(category, null, null, null);
    };

    return (
        <div className="filter-category-content">
            {categories.map(category => (
                <div key={category.id} className='filter-category'>
                    <input
                        type='radio'
                        id={`${category.id}`}
                        name='category'
                        checked={selectedCategory === category.filter}
                        onChange={() => handleCategoryChange(category.filter)}
                    />
                    <label htmlFor={`${category.id}`}>{category.name}</label>
                </div>
            ))}
        </div>
    );
}

export { CategoryButtons };
