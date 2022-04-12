import Home from "../components/Home";
import { useNavigate } from "react-router-dom";

const HomeController = () => {
	const navigate = useNavigate();
	
	const onCadastroClick = () => {
		navigate("/cadastro");
	};

	const onLeadsClick = () => {
		navigate("/lead");
	};

	return (<Home onCadastroClick={onCadastroClick} onLeadsClick={onLeadsClick} />);
};

export default HomeController;
