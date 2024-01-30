import React from 'react';
import './App.css';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Option from './components/Option/Option';
import ImageList from './components/ImageList/ImageList';

const App = (props) => {
	return (
		<div>
			<Header />
			<div className='home'>
				<div classNMAme='childContainer'>
					<div className='category'>
						<Category></Category>
					</div>
					<div className='option'>
						<Option></Option>
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
