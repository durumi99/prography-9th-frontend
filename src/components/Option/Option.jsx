import React from "react";
import './Option.css';
import Select from 'react-select';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
const Option = (props) => {
	// if(isBrowser) {
	// 	console.log('isBrower');
	// }
	// if(isMobile) {
	// 	console.log('isMobile');
	// }
	return (
		<div className="parentContainer">
      <div className="childContainer">
				<Select
				ref={props.selectSortInputRef}
				onChange={(sortOption) => {props.handleSelectSortChange(sortOption)}
			}
			options={props.sortOptions}
			// placeholder="최신순"
			defaultValue={props.sortOptions[0]}
			/>
		
      </div>
			<BrowserView>
			<div className="childContainer">
			<Select
				ref={props.selectViewInputRef}
				onChange={(viewOption) => {props.handleSelectViewChange(viewOption)}
			}
			options={props.viewOptions}
			// placeholder="4개씩 보기"
			defaultValue={props.viewOptions[1]}
			/>
			
			</div>
			</BrowserView>
    </div>
	);
};

export default Option;
