import React from "react";

const Home = ({ onCadastroClick, onLeadsClick }) => {
	return (
		<div className="home">
			<button className="BUTTON_MAT" onClick={onCadastroClick}>Cadastro</button>
			<button className="BUTTON_MAT" onClick={onLeadsClick}>Leads</button>
		</div>
	);
};

export default Home;
