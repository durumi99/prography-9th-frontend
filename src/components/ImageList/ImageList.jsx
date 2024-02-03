import React, { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './ImageList.css';

const ImageList = (props) => {
  const { imageData, sortOption, columnCount, currentResultCount, loading, setLoading, hasMore, onLoadMore } = props;

  const sortData = (data, sortOption) => {
    return data.sort((a, b) => {
      if (sortOption === 0) {
        const idMealA = parseInt(a.idMeal);
        const idMealB = parseInt(b.idMeal);
        return idMealB - idMealA;
      } else if (sortOption === 1) {
        return a.strMeal.localeCompare(b.strMeal);
      } else if (sortOption === 2) {
        return b.strMeal.localeCompare(a.strMeal);
      }
    });
  };

  const sortedImageList = sortData(imageData, sortOption.value);

  const observer = useRef();

  const lastImageRef = (node) => {
    if (!loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    if (node) observer.current.observe(node);
  };
  const onLoad = () => {
    setLoading(true);
  };

  return (
    <div className={`image-grid columns-${columnCount}`}>
      {sortedImageList.slice(0, currentResultCount).map((el, index) => (
        <div key={index} ref={index === currentResultCount - 1 ? lastImageRef : null} className='image-item'>
          <LazyLoadImage
            className='image'
            alt={el.strMeal}
            src={el.strMealThumb}
            effect='blur'
            delayMethod='debounce'
            onLoad={onLoad}
          />
          <p className='description'>{el.strMeal}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
