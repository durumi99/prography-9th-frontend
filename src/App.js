import React, { useRef, useState } from 'react';
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

	const sortOptions = [
		{ value: 0, label: '최신순' },
		{ value: 1, label: '이름 오름차순' },
		{ value: 2, label: '이름 내림차순' },
	];

	const viewOptions = [
		{ value: 0, label: '2개씩 보기' },
		{ value: 1, label: '4개씩 보기' },
	];

	const [selectSortValue, setSelectSortValue] = useState(sortOptions[0]);
	const selectSortInputRef = useRef(null);

	const handleSelectSortChange = (sortOption, index) => {
		if (sortOption) {
			setSelectSortValue(sortOption);
		} else {
			setSelectSortValue('');
		}
	};

	const [selectViewValue, setSelectViewValue] = useState(viewOptions[1]);
	const selectViewInputRef = useRef(null);

	const handleSelectViewChange = (viewOption, index) => {
		if (viewOption) {
			setSelectViewValue(viewOption);
		} else {
			setSelectViewValue('');
		}
	};

	const [currentResultCount, setCurrentResultCount] = useState(0);
	const [resultCount, setResultCount] = useState(0);

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
							<Result
								currentResultCount={currentResultCount}
								resultCount={resultCount}></Result>
						</div>
						<div className='option'>
							<Option
								selectSortInputRef={selectSortInputRef}
								handleSelectSortChange={handleSelectSortChange}
								sortOptions={sortOptions}
								selectViewInputRef={selectViewInputRef}
								handleSelectViewChange={handleSelectViewChange}
								viewOptions={viewOptions}></Option>
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
