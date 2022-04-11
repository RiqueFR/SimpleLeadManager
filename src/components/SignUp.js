import React from "react";

import InputDiv from "./InputDiv";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ data, onSubmit, onChange, toast }) => {
	return (
		<div className="user-signup">
			<form onSubmit={onSubmit}>
				<InputDiv text="Usuário" id="user" type="text" name="user" onChange={onChange} value={data.user} errors={data.errors.username} />
				<InputDiv text="Password" id="password" type="password" name="password" onChange={onChange} value={data.password} errors={data.errors.password} />
				<InputDiv text="Confirmação Password" id="conf-password" type="password" name="confPassword" onChange={onChange} value={data.confPassword} errors={data.errors.confPassword} />
				<button>Registrar</button>
			</form>
			<ToastContainer autoClose={10000} />
		</div>
	);
}

export default SignUp;
