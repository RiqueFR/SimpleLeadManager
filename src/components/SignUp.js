import React, { useState } from "react";

function hasNumber(str) {
	return (/\d/.test(str));
}

function hasLetter(str) {
	return (/[a-zA-Z]/.test(str));
}

function hasSpecialChar(str) {
	return (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str));
}

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
		//console.log(values.valid);
		
		// inputs validation
		let errors = {
			username: false,
			password: [],
			confPassword: false
		}
		let valid = true;

		// username should not be blank
		if (values.user === '') {
			errors.username = "Username é um campo obrigatório"
			valid = false;
		}

		// password should not be blank
		if (values.password === '') {
			errors.password.push("Senha é um campo obrigatório")
		}
		else {
			// password should have at least 8 caracters
			if (values.password.length < 8) {
				errors.password.push("Senha precisa ter pelo menos 8 digitos");
				valid = false;
			}

			// password should have at leats one number
			if (!hasNumber(values.password)) {
				errors.password.push("Senha precisa ter pelo menos 1 número");
				valid = false;
			}

			// password should have at least one letter
			if (!hasLetter(values.password)) {
				errors.password.push("Senha precisa ter pelo menos 1 letra");
				valid = false;
			}

			// password should have at least one special caracter
			if (!hasSpecialChar(values.password)) {
				errors.password.push("Senha precisa ter pelo menos 1 caracter especial");
				valid = false;
			}
		}

		// confirmation password should not be blank
		if (values.confPassword === '') {
			errors.confPassword= "Senha é um campo obrigatório";
			valid = false;
		} else {
			// confirmation password need to be equals to the password
			if (values.password !== values.confPassword) {
				errors.confPassword = "As senhas precisam ser iguais";
				valid = false;
			}
		}

		console.log(errors);
		setValues({
			...values,
			errors: errors
		});
		if (valid) { // credantials are valid, so we can save then to the local storage
			//save
			console.log("Conta cadastrada com sucesso");
		}
	};

	function onChange(event) {
		const { value, name } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	}
	
	let errorsPasswordLabels = [];
	for (let index in values.errors.password) {
		errorsPasswordLabels.push(<label key={index}>{values.errors.password[index]}</label>);
	}

	return (
		<div className="user-signup">
			<form onSubmit={onSubmit}>
				<div>
					<label>Usuário</label>
					<input id="user" type="text" name="user" onChange={onChange} value={values.user} />
					{values.errors.username && <label>{values.errors.username}</label>}
				</div>
				<div>
					<label>Password</label>
					<input id="password" type="password" name="password" onChange={onChange} value={values.password} />
					{errorsPasswordLabels}
				</div>
				<div>
					<label>Comfirmação Password</label>
					<input id="conf-password" type="password" name="confPassword" onChange={onChange} value={values.confPassword} />
					{values.errors.confPassword && <label>{values.errors.confPassword}</label>}
				</div>
				<button>Registrar</button>
			</form>
		</div>
	);
}

export default SignUp;
