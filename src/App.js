import React, { useState } from 'react';
import './App.css';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Result from './components/Result/Result';
import Option from './components/Option/Option';
import ImageList from './components/ImageList/ImageList';

const App = (props) => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleCategoryClick = (category, index) => {
		if (selectedCategories.includes(index + 1)) {
			// 이미 선택되어 있던 경우, 선택 취소
			setSelectedCategories(
				selectedCategories.filter((item) => item !== index + 1)
			);
		} else {
			// 선택되어 있지 않은 경우, 선택
			setSelectedCategories([...selectedCategories, index + 1]);
		}

		// console.log(selectedCategories);
	};

	const categories = [
		'Beef',
		'Chicken',
		'Dessert',
		'Lamb',
		'Miscellaneous',
		'Pasta',
		'Pork',
		'Seafood',
		'Side',
		'Starter',
		'Vegan',
		'Vegetarian',
		'Breakfast',
		'Goat',
	];

	return (
		<div>
			<Header />
			<div className='home'>
				<div className='childContainer'>
					<div className='category'>
						<Category
							categories={categories}
							handleCategoryClick={handleCategoryClick}
							selectedCategories={selectedCategories}></Category>
					</div>
					<div className='row'>
						<div className='result'>
							<Result></Result>
						</div>
						<div className='option'>
							<Option></Option>
						</div>
					</div>
					<div className='imageList'>
						<ImageList></ImageList>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
