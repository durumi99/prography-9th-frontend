import React, {useEffect, useState, useRef} from "react";
import './Result.css';
// import logo from '../images/logo.png';

const Result = () => {
  // const [selectedCurrentValue, setSelectedCurrentValue] = useState();
  const currentResultCount = 46;
  const resultCount = 46;
	return (
		<div>
			{/* <img id='logo' src={logo} alt='prography' width='50px'/> */}
      <span className="underline">{currentResultCount}</span> 
      <span> / </span>
      <span className="underline">{resultCount}</span> 개 조회
		</div>
	);
};

export default Result;
