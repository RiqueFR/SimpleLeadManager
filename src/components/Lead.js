import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from "../services/Store";

function initialState() {
	return { lead: [],
		errors: {
			name: [],
			phone: [],
			mail: [],
			checkbox: []
		},
	};
}

const Lead = () => {
	const [values, setValues] = useState(initialState);
	const navigate = useNavigate();

	const leads = getDataFromLocalStorage('lead');
	const leadsComponents = [];
	for(let index in leads) {
		leadsComponents.push(<p key={index}>{leads[index].name}</p>)
	}

	const onCLick = (event) => {
		navigate("/lead/new");
	};

	return (
		<div className="lead">
			<button onClick={onCLick}>Novo Lead (+)</button>
			<div className="table">
				{leadsComponents}
			</div>
		</div>
	);
};

export default Lead;
