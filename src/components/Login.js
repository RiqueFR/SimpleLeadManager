import React from "react";
import { ToastContainer } from "react-toastify";

import InputDiv from "./InputDiv";

const Login = ({ data, onSubmit, onChange }) => {
	return (
		<div className="login">
			<form onSubmit={onSubmit}>
				<InputDiv text="Usuário" id="user" type="text" name="username" onChange={onChange} value={data.username} errors={data.errors.username} />
				<InputDiv text="Password" id="password" type="password" name="password" onChange={onChange} value={data.password} errors={data.errors.password} />
				<button className="BUTTON_MAT">Logar</button>
			</form>
			<ToastContainer autoClose={10000} />
		</div>
	);
};

export default Login;
