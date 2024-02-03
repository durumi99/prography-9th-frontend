import React from 'react';
import './Category.css';

const Category = (props) => {
	const {categories, selectedCategories, handleCategoryClick} = props;

  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={category}
          className={`categoryButton ${selectedCategories.includes(category) ? 'isSelected' : ''}`}
          onClick={() => handleCategoryClick(category, index)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
