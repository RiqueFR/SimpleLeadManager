import React from "react";

const Home = ({ onLoginClick, onCadastroClick, onLeadsClick }) => {
	return (
		<div className="home">
			<button className="BUTTON_MAT" onClick={onLoginClick}>Login</button>
			<button className="BUTTON_MAT" onClick={onCadastroClick}>Cadastro</button>
			<button className="BUTTON_MAT" onClick={onLeadsClick}>Leads</button>
		</div>
	);
};

export default Home;
