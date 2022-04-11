import { useState } from "react";

import validate_credentials from "../utils/validator";
import { registerUser } from "../services/User";

import SignUp from "../components/SignUp";
import { toast } from "react-toastify";

function initialState() {
	return { user: '', password: '', confPassword: '', valid: false,
		errors: {
			username: [],
			password: [],
			confPassword: [] 
		}
	};
}

const SignUpController = () => {
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
		<SignUp data={values} onSubmit={onSubmit} onChange={onChange} toast={toast} />
	);
};

export default SignUpController;
