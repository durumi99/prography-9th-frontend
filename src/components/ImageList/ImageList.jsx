import React from 'react';
import './ImageList.css';

const ImageList = (props) => {
	console.log(props.data);
	return (
    <div className={`image-grid columns-${props.columnCount}`}>
      {props.data.map((el, index) => (
        <div key={index} className="image-item" >
          <img className="image" src={el.strMealThumb} alt={el} />
          <p className="description">{el.strMeal}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
