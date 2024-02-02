import React from 'react';
import './Category.css';

const Category = (props) => {

	return (
		<div>
			{props.categories.map((category, index) => (
				
					<label key={category}>
            <button
							className={`categoryButton ${props.selectedCategories.includes(category) ? 'isSelected' : ''}`}
							key={category}
							onClick={() => props.handleCategoryClick(category, index)}
						>
							{category}
						</button>
          </label>
			))

			}
		</div>
	);
};

export default Category;
