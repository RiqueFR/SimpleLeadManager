import React, { useState } from "react";

import InputDiv from "./InputDiv";
import validate_credentials from "../utils/validator";
import { registerUser } from "../services/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function initialState() {
	return { user: '', password: '', confPassword: '', valid: false,
		errors: {
			username: false,
			password: [],
			confPassword: false
		}
	};
}

const SignUp = () => {
	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		// prevent the page to reload and loose information
		e.preventDefault()
		
		// inputs validation
		const [valid, errors] = validate_credentials(values.user, values.password, values.confPassword);
		setValues({
			...values,
			errors: errors
		});
		if (valid) { // credentials are valid, so we can save then to the local storage
			const data = {
				user: values.user,
				password: values.password,
			}
			// save to local storage
			if (registerUser(data)) { // if user register successfully
				toast.success("Conta cadastrada com sucesso", {
					position: toast.POSITION.TOP_RIGHT
				})
			} else {
				toast.error("Usuário já cadastrado", {
					position: toast.POSITION.TOP_RIGHT
				})
			}
		}
	};

	const onChange = (event) => {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	
	return (
		<div className="user-signup">
			<form onSubmit={onSubmit}>
				<InputDiv text="Usuário" id="user" type="text" name="user" onChange={onChange} value={values.user} errors={values.errors.username} />
				<InputDiv text="Password" id="password" type="password" name="password" onChange={onChange} value={values.password} errors={values.errors.password} />
				<InputDiv text="Confirmação Password" id="conf-password" type="password" name="confPassword" onChange={onChange} value={values.confPassword} errors={values.errors.confPassword} />
				<button>Registrar</button>
			</form>
			<ToastContainer autoClose={10000} />
		</div>
	);
}

export default SignUp;
