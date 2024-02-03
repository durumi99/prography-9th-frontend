import React, { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './ImageList.css';

const ImageList = (props) => {
  const { imageData, sortOption, columnCount, currentResultCount, loading, setLoading, hasMore, onLoadMore } = props;

  const sortData = (data, sortOption) => {
    return data.sort((a, b) => {
      switch (sortOption) {
        case 0:
          return parseInt(b.idMeal, 10) - parseInt(a.idMeal, 10);
        case 1:
          return a.strMeal.localeCompare(b.strMeal);
        case 2:
          return b.strMeal.localeCompare(a.strMeal);
        default:
          return 0;
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
