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
	let navigate = useNavigate();

	const onSubmit = (e) => {
		// prevent the page to reload and loose information
		e.preventDefault()
	};

	const onCLick = (event) => {
		navigate("/lead/new");
	};

	function onChange(event) {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	}

	return (
		<div className="lead">
			<button onClick={onCLick}>Novo Lead (+)</button>
			<div className="table">
			</div>
		</div>
	);
};

export default Lead;
