import React from "react";
import './Option.css';
import Select from 'react-select';

const Option = (props) => {
	
	return (
		<div className="parentContainer">
      <div className="childContainer">
				<Select
				ref={props.selectSortInputRef}
				onChange={(sortOption) => {props.handleSelectSortChange(sortOption)}
			}
			options={props.sortOptions}
			placeholder="최신순"
			/>
		
      </div>
			<div className="childContainer">
			<Select
				ref={props.selectViewInputRef}
				onChange={(viewOption) => {props.handleSelectViewChange(viewOption)}
			}
			options={props.viewOptions}
			placeholder="4개씩 보기"
			/>
			</div>
    </div>
	);
};

export default Option;
