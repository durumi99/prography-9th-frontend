import React from 'react';
import './ImageList.css';

const ImageList = (props) => {
	console.log(props.data);
	return (
    <div className={`image-grid columns-${props.columnCount}`}>
      {props.data.map((el, index) => (
        <div key={index} className="image-item" >
          <img className="image" src={el.strCategoryThumb} alt={el.strCategory} />
          <p className="description">{el.strCategoryDescription.substring(0, 20)}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
