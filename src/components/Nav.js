import React from "react";
import { useLocation } from "react-router-dom";

const Nav = () => {
	const location = useLocation();
	const getTitle = () => {
		const pages = [{
			page: "/lead/new",
			title: "Cadastro Lead"
		}, {
			page: "/lead",
			title: "Leads"
		}, {
			page: "/cadastro",
			title: "Cadastro de Usuários"
		}, {
			page: "",
			title: "Home"
		}];

		for(let page of pages) {
			if(location.pathname === page.page ||
			   location.pathname === (page.page + "/"))
				return page.title;
		}
	};
	const title = getTitle();

	return (
		<div className="nav-bar">
				<img src={process.env.PUBLIC_URL + "/elo.svg"} alt="logo" />
				<h1>{title}</h1>
		</div>
	);
}

export default Nav;
