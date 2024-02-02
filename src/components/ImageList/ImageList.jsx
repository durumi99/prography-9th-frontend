import React from 'react';
import './ImageList.css';

const ImageList = (props) => {
	console.log(props.data);
  const sortData = (data, sortOption) => {
    return data.sort((a, b) => {
      if (sortOption === 0) {
        // idMeal 기준으로 내림차순 정렬
        const idMealA = parseInt(a.idMeal);
        const idMealB = parseInt(b.idMeal);
        return idMealB - idMealA;
      } else if (sortOption === 1) {
        // strMeal 기준으로 알파벳 오름차순 정렬
        return a.strMeal.localeCompare(b.strMeal);
      } else if (sortOption === 2) {
        // strMeal 기준으로 알파벳 내림차순 정렬
        return b.strMeal.localeCompare(a.strMeal);
      }
    });
  };
  const sortedImageList = sortData(props.data, props.sortOption.value);
  // console.log(props);
	return (
    
    <div className={`image-grid columns-${props.columnCount}`}>
      {sortedImageList.map((el, index) => (
        <div key={index} className="image-item" >
          <img className="image" src={el.strMealThumb} alt={el} />
          <p className="description">{el.strMeal}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
