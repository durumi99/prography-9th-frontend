import React from "react";
import './Result.css';

const Result = (props) => {
  const { currentResultCount, resultCount} = props;
	return (
		<div>
			<span className="underline">{currentResultCount}</span> 
      <span> / </span>
      <span className="underline">{resultCount}</span> 개 조회
		</div>
	);
};

export default Result;
