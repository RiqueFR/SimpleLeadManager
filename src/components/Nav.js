import React from "react";

const Nav = ({ title, onClick }) => {
	return (
		<div className="nav-bar">
				<img src={process.env.PUBLIC_URL + "/elo.svg"} onClick={onClick} alt="logo" />
				<h1>{title}</h1>
		</div>
	);
}

export default Nav;
