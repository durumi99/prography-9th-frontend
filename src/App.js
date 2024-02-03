import React, { useRef, useState, useEffect, useMemo } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Result from './components/Result/Result';
import Option from './components/Option/Option';
import ImageList from './components/ImageList/ImageList';
import ApiService from './services/ApiService';

import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from 'react-device-detect';

const App = (props) => {
	const apiService = useMemo(
		() => new ApiService('https://www.themealdb.com/api/json/v1/1'),
		[]
	);
	const sortOptions = [
		{ value: 0, label: '최신순' },
		{ value: 1, label: '이름 오름차순' },
		{ value: 2, label: '이름 내림차순' },
	];

	const viewOptions = [
		{ value: 2, label: '2개씩 보기' },
		{ value: 4, label: '4개씩 보기' },
	];

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectsortOption, setSelectsortOption] = useState(sortOptions[0]);
	const selectSortInputRef = useRef(null);
	const [selectViewOption, setSelectviewOption] = useState(
		isMobile ? 1 : viewOptions[1]
	);
	const selectViewInputRef = useRef(null);
	const [currentResultCount, setCurrentResultCount] = useState(0);
	const [resultCount, setResultCount] = useState(0);
	const [imageData, setImageData] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleCategoryClick = (category, index) => {
		// const queryParams = new URLSearchParams(location.search);
		// queryParams.set('category', category);
		// history.push({ search: queryParams.toString() });

		if (selectedCategories.includes(category)) {
			setSelectedCategories(
				selectedCategories.filter((item) => item !== category)
			);
		} else {
			setSelectedCategories([...selectedCategories, category]);
		}
	};

	const handleSelectSortChange = (sortOption, index) => {
		setSelectsortOption(sortOption || '');
	};

	const handleSelectViewChange = (viewOption, index) => {
		setSelectviewOption(viewOption || '');
	};

	const handleLoadMoreImages = () => {
		const loadCount = 20;
		let newLoadedImages = currentResultCount + loadCount;

		if (newLoadedImages >= imageData.length) {
			newLoadedImages = imageData.length;
		}

		setCurrentResultCount(newLoadedImages);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiService.getCategories();
				const result = response.categories;

				let strCategories = [];
				result.map((category, index) =>
					strCategories.push(category.strCategory)
				);
				setCategories(strCategories);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, [apiService]);

	useEffect(() => {
		if (selectedCategories.length) {
			const fetchData = async () => {
				try {
					// let queryString =
					// 	'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
					// let result = [];

					// await Promise.all(
					// 	selectedCategories.map(async (strCategory, index) => {
					// 		const res = await axios.get(queryString + strCategory);
					// 		Array.prototype.push.apply(result, res.data.meals);
					// 	})
					// );

					let result = [];

					await Promise.all(
						selectedCategories.map(async (strCategory) => {
							const response = await apiService.getMealsByCategory(strCategory);
							const meals = response.meals;
							Array.prototype.push.apply(result, meals);
						})
					);

					setImageData(result);
					setResultCount(result.length);
					setCurrentResultCount(Math.min(result.length, 20));
					setHasMore(true);
				} catch (e) {
					console.log(e);
				}
			};
			fetchData();
		} else {
			setImageData([]);
			setResultCount(0);
			setCurrentResultCount(0);
		}
	}, [apiService, selectedCategories]);

	useEffect(() => {
		if (currentResultCount === 0) {
			setLoading(false);
		}
	}, [currentResultCount]);

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
						<ImageList
							imageData={imageData}
							sortOption={selectsortOption}
							columnCount={selectViewOption.value}
							currentResultCount={currentResultCount}
							loading={loading}
							setLoading={setLoading}
							hasMore={hasMore}
							onLoadMore={handleLoadMoreImages}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
