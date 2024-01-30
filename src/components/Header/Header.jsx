import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
	return (
		<div>
			<img id='logo' src={logo} alt='prography' width='50px'/>
		</div>
	);
};

export default Header;
