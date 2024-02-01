import React from "react";
import './Result.css';
// import logo from '../images/logo.png';

const Result = (props) => {
  
	return (
		<div>
			{/* <img id='logo' src={logo} alt='prography' width='50px'/> */}
      <span className="underline">{props.currentResultCount}</span> 
      <span> / </span>
      <span className="underline">{props.resultCount}</span> 개 조회
		</div>
	);
};

export default Result;
