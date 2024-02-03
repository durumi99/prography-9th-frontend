import React, { useRef, useState, useEffect } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Result from './components/Result/Result';
import Option from './components/Option/Option';
import ImageList from './components/ImageList/ImageList';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from 'react-device-detect';

const App = (props) => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleCategoryClick = (category, index) => {
		// const queryParams = new URLSearchParams(location.search);
		// queryParams.set('category', category);
		// history.push({ search: queryParams.toString() });

		if (selectedCategories.includes(category)) {
			// 이미 선택되어 있던 경우, 선택 취소
			setSelectedCategories(
				selectedCategories.filter((item) => item !== category)
			);
		} else {
			// 선택되어 있지 않은 경우, 선택
			setSelectedCategories([...selectedCategories, category]);
		}
	};
	const [categories, setCategories] = useState([]);

	const sortOptions = [
		{ value: 0, label: '최신순' },
		{ value: 1, label: '이름 오름차순' },
		{ value: 2, label: '이름 내림차순' },
	];

	const viewOptions = [
		{ value: 2, label: '2개씩 보기' },
		{ value: 4, label: '4개씩 보기' },
	];

	const [selectsortOption, setSelectsortOption] = useState(sortOptions[0]);
	const selectSortInputRef = useRef(null);

	const handleSelectSortChange = (sortOption, index) => {
		if (sortOption) {
			setSelectsortOption(sortOption);
		} else {
			setSelectsortOption('');
		}
	};

	const [selectViewOption, setSelectviewOption] = useState(
		isMobile ? 1 : viewOptions[1]
	);
	const selectViewInputRef = useRef(null);

	const handleSelectViewChange = (viewOption, index) => {
		if (viewOption) {
			setSelectviewOption(viewOption);
		} else {
			setSelectviewOption('');
		}
	};

	const [currentResultCount, setCurrentResultCount] = useState(0);
	const [resultCount, setResultCount] = useState(0);

	// const [data, setData] = useState([]);
	const [imageData, setImageData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					'https://www.themealdb.com/api/json/v1/1/categories.php'
				);
				const result = res.data.categories;

				let strCategories = [];
				result.map((category, index) => {
					strCategories.push(category.strCategory);
				});
				setCategories(strCategories);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	// useEffect(() => {
	// 	console.log(currentResultCount);
	// }, [currentResultCount]);

	useEffect(() => {
		// console.log('렌더링 될때마다 실행');
		// console.log(selectedCategories);
		if (selectedCategories.length) {
			const fetchData = async () => {
				try {
					let queryString =
						'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
					let result = [];
					// await setLoading(true);
					await Promise.all(
						selectedCategories.map(async (strCategory, index) => {
							const res = await axios.get(queryString + strCategory);
							Array.prototype.push.apply(result, res.data.meals);
						})
					);

					setImageData(result);
					setResultCount(result.length);
					setCurrentResultCount(Math.min(result.length, 20));
					setHasMore(true);
					// setLoading(false);
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
	}, [selectedCategories]);

	useEffect(() => {
		if (currentResultCount === 0) setLoading(false);
	}, [currentResultCount]);

	const handleLoadMoreImages = () => {
		// setLoading(true);

		const loadCount = 20;
		let newLoadedImages = currentResultCount + loadCount;

		if (newLoadedImages >= imageData.length) {
			newLoadedImages = imageData.length;
			// setHasMore(false);
		}

		setCurrentResultCount(newLoadedImages);
		// setLoading(false);
	};

	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

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
						{/* <ImageList
							data={imageData}
							currentResultCount={currentResultCount}
							columnCount={selectViewOption.value}
							sortOption={selectsortOption}
							onLoadMore={handleLoadMoreImages}></ImageList> */}
						<ImageList
							data={imageData}
							columnCount={selectViewOption.value}
							sortOption={selectsortOption}
							loading={loading}
							setLoading={setLoading}
							hasMore={hasMore}
							onLoadMore={handleLoadMoreImages}
							setCurrentResultCount={setCurrentResultCount}
							currentResultCount={currentResultCount}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
