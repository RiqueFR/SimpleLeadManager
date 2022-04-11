import React, { useState } from "react";
import {registerLead} from "../services/Lead";
import validateNewLead from "../utils/validatorNewLead";
import CheckboxDiv from "./CheckboxDiv";
import InputDiv from "./InputDiv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function initialState() {
	return { name: '', phone: '', mail: '', valid: false, all: false,
		errors: {
			name: [],
			phone: [],
			mail: [],
			checkbox: []
		},
		checkbox: {
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

		// validate the inputs
		const [ valid, errors ] = validateNewLead(values.name, values.phone, values.mail, values.checkbox);

		setValues({
			...values,
			errors: errors
		});
		if (valid) {
			// create the new data to be added
			const data = {
				name: values.name,
				phone: values.phone,
				mail: values.mail,
				opportunities: values.checkbox
			}
			// save to Local Storage
			registerLead(data);
			// message saying it is saved
			toast.success("Lead salvo", {
				position: toast.POSITION.TOP_RIGHT
			});
			console.log("Salvo com sucesso");
		}
	};

	function onCheck(event) {
		const { checked, name } = event.target;

		// the all checkbox have a different behavior
		if (name === "all") { 
			// if it is checked, all other checkboxes need to be checked too
			if (checked) {
				setValues({
					...values,
					all: checked,
					checkbox: {
						rpa: true,
						digProd: true,
						analystics: true,
						bpm: true
					}
				});
			} else { // if not, only the all checkbox needs to change
				setValues({
					...values,
					all: checked
				});
			}
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

	const onChange = (event) => {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	let errorsCheckbox = values.errors.checkbox;
	let errorsCheckboxLabels = [];
	for (let index in errorsCheckbox) {
		errorsCheckboxLabels.push(<label key={index}>{errorsCheckbox[index]}</label>);
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
					<CheckboxDiv text="Marcar Todos" id="all" name="all" onChange={onCheck} checked={values.all} />
					<CheckboxDiv text="RPA" id="rpa" name="rpa" onChange={onCheck} checked={values.checkbox.rpa} />
					<CheckboxDiv text="Produto Digital" id="dig-prod" name="digProd" onChange={onCheck} checked={values.checkbox.digProd} />
					<CheckboxDiv text="Analystics" id="analystics" name="analystics" onChange={onCheck} checked={values.checkbox.analystics} />
					<CheckboxDiv text="BPM" id="bpm" name="bpm" onChange={onCheck} checked={values.checkbox.bpm} />
					{errorsCheckboxLabels}
					<button>Registrar</button>
					<ToastContainer autoClose={10000} />
				</div>
			</form>
		</div>
	);
};

export default NewLead;
