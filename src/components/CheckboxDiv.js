import React from "react";

const CheckboxDiv= (props) => {
	return (
		<div className="div-checkbox">
			<div className="check">
			<input id={props.id} type="checkbox" name={props.name} onChange={props.onChange} checked={props.checked} />
				</div>
			<label htmlFor={props.id}>{props.text}</label>
		</div>
	);
}

export default CheckboxDiv;
