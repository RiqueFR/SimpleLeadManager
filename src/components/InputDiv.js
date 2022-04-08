import React from "react";

const InputDiv = (props) => {
	const errors = props.errors;
	let errors_labels = [];
	for (let index in errors) {
		errors_labels.push(<label key={index}>{errors[index]}</label>);
	}

	return (
		<div>
			<label>{props.text}</label>
			<input id={props.id} type={props.type} name={props.name} onChange={props.onChange} value={props.value} />
			{errors_labels}
		</div>
	);
}

export default InputDiv;
