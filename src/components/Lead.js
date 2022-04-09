import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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

	const onCLick = (event) => {
		navigate("/lead/new");
	};

	return (
		<div className="lead">
			<button onClick={onCLick}>Novo Lead (+)</button>
			<div className="table">
			</div>
		</div>
	);
};

export default Lead;
