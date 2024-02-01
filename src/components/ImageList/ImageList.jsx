import React from 'react';

const ImageList = (props) => {
	console.log(props.data);
	return (
		<div>
			{props.data.map((el, index) => (
				<div>
					<img id='logo' src={el.strCategoryThumb} alt='prography' width='50px'/>
					{el.strCategoryDescription.substring(0, 20)}
				</div>
			))}
		</div>
	);
};

export default ImageList;
