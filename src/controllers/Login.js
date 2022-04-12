import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '../services/User';

import Login from '../components/Login';

function initialState() {
	return { username: '', password: '', errors: {username: [], password: []}};
}

const LoginController = () => {
	const navigate = useNavigate();

	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		// prevent the page to reload and loose information
		e.preventDefault()

		// inputs validation
		const valid = login(values.username, values.password);

		if(valid) {
			navigate("/lead");
		} else {
			toast.error("Usuário ou senha incorretos", {
				position: toast.POSITION.TOP_RIGHT
			})
		}
	};

	const onChange = (event) => {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
			errors: {
				...values.errors,
				[name]: []
			}
		});
	};

	return (<Login data={values} onChange={onChange} onSubmit={onSubmit} />);
};

export default LoginController;
