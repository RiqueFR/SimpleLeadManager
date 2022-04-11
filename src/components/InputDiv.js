import React from "react";

const InputDiv = (props) => {
	const errors = props.errors;
	let errors_labels = [];
	for (let index in errors) {
		errors_labels.push(<label className="errors" key={index}>{errors[index]}</label>);
	}

	return (
		<div className="sign-input">
			<span>{props.text}</span>
			<input id={props.id} type={props.type} name={props.name} onChange={props.onChange} value={props.value} />
			{errors_labels}
		</div>
	);
}

export default InputDiv;
