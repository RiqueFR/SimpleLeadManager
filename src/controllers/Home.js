import Home from "../components/Home";
import { useNavigate } from "react-router-dom";

const HomeController = () => {
	const navigate = useNavigate();

	const onLoginClick = () => {
		navigate("/login");
	};
	
	const onCadastroClick = () => {
		navigate("/cadastro");
	};

	const onLeadsClick = () => {
		navigate("/lead");
	};

	return (<Home onLoginClick={onLoginClick} onCadastroClick={onCadastroClick} onLeadsClick={onLeadsClick} />);
};

export default HomeController;
