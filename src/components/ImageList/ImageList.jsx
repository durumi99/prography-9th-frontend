import React, { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './ImageList.css';

const ImageList = (props) => {
  // let isLoaded = false;

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

  const sortedImageList = sortData(props.data, props.sortOption.value);

  const observer = useRef();

  const lastImageRef = (node) => {
    // console.log('맨 아래 도착');
    // console.log(props.loading);
    // alert(props.currentResultCount);
    // console.log('isLoaded', isLoaded);

    if (!props.loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      // console.log('맨 아래 도착');
      if (entries[0].isIntersecting && props.hasMore) {
        props.onLoadMore();
      }
    });

    if (node) observer.current.observe(node);
  };
  const onLoad = () => {
    props.setLoading(true);
  };

  return (
    <div className={`image-grid columns-${props.columnCount}`}>
      {sortedImageList.slice(0, props.currentResultCount).map((el, index) => (
        <div key={index} ref={index === props.currentResultCount - 1 ? lastImageRef : null} className='image-item'>
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
