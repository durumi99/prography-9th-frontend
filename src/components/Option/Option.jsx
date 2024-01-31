import React, {useEffect, useState, useRef} from "react";
import './Option.css';
import Select from 'react-select';

const Option = () => {
	const sortOptions = [
		{value: 0, label:'최신순'},
		{value: 1, label:'이름 오름차순'},
		{value: 2, label:'이름 내림차순'},
	];

	const viewOptions = [
		{value: 0, label:'2개씩 보기'},
		{value: 1, label:'4개씩 보기'},
	];

	const [selectSortValue, setSelectSortValue] = useState(sortOptions[0]);
	const selectSortInputRef = useRef(null);

	const handleSelectSortChange = (sortOption, index) => {
		if (sortOption) {
			setSelectSortValue(sortOption.value);
		} else {
			setSelectSortValue("");
		}
	}

	const [selectViewValue, setSelectViewValue] = useState(viewOptions[1]);
	const selectViewInputRef = useRef(null);

	const handleSelectViewChange = (viewOption, index) => {
		if (viewOption) {
			setSelectViewValue(viewOption.value);
		} else {
			setSelectViewValue("");
		}
	}

	return (
		<div className="parentContainer">
      <div className="childContainer">
        {/* 자식 노드들 */}
				<Select
				ref={selectSortInputRef}
				onChange={(sortOption) => {handleSelectSortChange(sortOption)}
			}
			options={sortOptions}
			placeholder="최신순"
			/>
		
      </div>
			<div className="childContainer">
			<Select
				ref={selectViewInputRef}
				onChange={(viewOption) => {handleSelectViewChange(viewOption)}
			}
			options={viewOptions}
			placeholder="4개씩 보기"
			/>
			</div>
    </div>
	);
};

export default Option;
