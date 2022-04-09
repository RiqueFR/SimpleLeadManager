import React from "react";

const CheckboxDiv= (props) => {
	return (
		<div>
			<input id={props.id} type="checkbox" name={props.name} onChange={props.onChange} checked={props.checked} />
			<label>{props.text}</label>
		</div>
	);
}

export default CheckboxDiv;
