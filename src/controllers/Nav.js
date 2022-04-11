import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const NavController = () => {
	const navigate = useNavigate();
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

	const onClick = () => {
		navigate("/");
	};

	return (<Nav title={title} onClick={onClick} />);
}

export default NavController;
