import React from "react";

const InputDiv = (props) => {
	return (
		<div className="sign-input">
			<label htmlFor={props.id}>{props.text}</label>
			<input id={props.id} type={props.type} name={props.name} onChange={props.onChange} value={props.value} />
			{props.errors.map((erro, index) => (<label className="errors" key={index}>{erro}</label>))}
		</div>
	);
}

export default InputDiv;
