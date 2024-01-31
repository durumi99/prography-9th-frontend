import React, { useState } from 'react';
import './Category.css';
// import logo from '../images/logo.png';

const Category = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

  // const handleOptionChange = (option) => {
  //   // 옵션 토글
  //   if (selectedOptions.includes(option)) {
  //     setSelectedOptions(selectedOptions.filter((item) => item !== option));
  //   } else {
  //     setSelectedOptions([...selectedOptions, option]);
  //   }
  // };
	// const handleCategoryClick = (category, index) => {
	// 	console.log(category, index + 1);
	// 	if (selectedCategories.includes(category)) {
	// 		setSelectedCategories(selectedCategories.filter((item) => item !== index + 1));
	// 	} else {
	// 		setSelectedCategories([...selectedCategories, index + 1]);
	// 	}
	// 	console.log(selectedCategories);
	
	// }
	
	const handleCategoryClick = (category, index) => {
    if (selectedCategories.includes(index + 1)) {
      // 이미 선택되어 있던 경우, 선택 취소
      setSelectedCategories(selectedCategories.filter((item) => item !== index + 1));
    } else {
      // 선택되어 있지 않은 경우, 선택
      setSelectedCategories([...selectedCategories, index + 1]);
    }

		// console.log(selectedCategories);
  };

  const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat', ];

	return (
		<div>
			{/* {selectedCategories} */}
			{/* <img id='logo' src={logo} alt='prography' width='50px'/> */}
      {/* <span>Category</span> */}
			{categories.map((category, index) => (
				
					<label key={category}>
            <button
							className={`categoryButton ${selectedCategories.includes(index + 1) ? 'isSelected' : ''}`}
							key={category}
							onClick={() => handleCategoryClick(category, index)}
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
