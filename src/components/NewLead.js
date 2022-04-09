import React, { useState } from "react";
import InputDiv from "./InputDiv";

function initialState() {
	return { name: '', phone: '', mail: '', valid: false,
		errors: {
			name: [],
			phone: [],
			mail: [],
			checkbox: []
		},
		checkbox: {
			all: false,
			rpa: false,
			digProd: false,
			analystics: false,
			bpm: false
		}
	};
}

const NewLead = () => {
	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		// prevent the page to reload and loose information
		e.preventDefault()
	};

	function onCheck(event) {
		const { checked, name } = event.target;

		// if the chexkbox for check all is checked, check all chexkboxes
		if (name === "all" && checked) { 
			setValues({
				...values,
				checkbox: {
					...values.checkbox,
					all: true,
					rpa: true,
					digProd: true,
					analystics: true,
					bpm: true
				}
			});	
		} else {
			setValues({
				...values,
				checkbox: {
					...values.checkbox,
					[name]: checked
				}
			});	
		}
	}

	function onChange(event) {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	}

	return (
		<div className="new-lead">
			<form onSubmit={onSubmit}>
				<div className="text-input">
					<InputDiv text="Nome" id="name" type="text" name="name" onChange={onChange} value={values.name} errors={values.errors.name} />
					<InputDiv text="Telefone" id="phone" type="text" name="phone" onChange={onChange} value={values.phone} errors={values.errors.phone} />
					<InputDiv text="Email" id="mail" type="text" name="mail" onChange={onChange} value={values.mail} errors={values.errors.mail} />
				</div>
				<div>
					<div>
						<input id="all" type="checkbox" name="all" onChange={onCheck} checked={values.checkbox.all} />
						<label>Marcar Todos</label>
					</div>
					<div>
						<input id="rpa" type="checkbox" name="rpa" onChange={onCheck} checked={values.checkbox.rpa} />
						<label>RPA</label>
					</div>
					<div>
						<input id="dig-prod" type="checkbox" name="digProd" onChange={onCheck} checked={values.checkbox.digProd} />
						<label>Produto Digital</label>
					</div>
					<div>
						<input id="analystics" type="checkbox" name="analystics" onChange={onCheck} checked={values.checkbox.analystics} />
						<label>Analystics</label>
					</div>
					<div>
						<input id="bpm" type="checkbox" name="bpm" onChange={onCheck} checked={values.checkbox.bpm} />
						<label>BPM</label>
					</div>
					<button>Registrar</button>
				</div>
			</form>
		</div>
	);
};

export default NewLead;
