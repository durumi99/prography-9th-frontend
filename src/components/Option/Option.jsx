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
	const {
  selectSortInputRef,
  handleSelectSortChange,
  sortOptions,
  selectViewInputRef,
  handleSelectViewChange,
  viewOptions
} = props;

	return (
		<div className="parentContainer">
      <div className="childContainer">
				<Select
				ref={selectSortInputRef}
				onChange={(sortOption) => {handleSelectSortChange(sortOption)}}
				options={sortOptions}
				defaultValue={sortOptions[0]}
				/>
      </div>
			<BrowserView>
				<div className="childContainer">
					<Select
						ref={selectViewInputRef}
						onChange={(viewOption) => {handleSelectViewChange(viewOption)}}
					options={viewOptions}
					defaultValue={viewOptions[1]}
					/>
				</div>
			</BrowserView>
    </div>
	);
};

export default Option;
