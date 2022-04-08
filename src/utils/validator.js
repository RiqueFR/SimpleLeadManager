function hasNumber(str) {
	return (/\d/.test(str));
}

function hasLetter(str) {
	return (/[a-zA-Z]/.test(str));
}

function hasSpecialChar(str) {
	return (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str));
}

export default function validate(username, password, confPassword) {
	// inputs validation
	let errors = {
		username: [],
		password: [],
		confPassword: []
	}
	let valid = true;

	// username should not be blank
	if (username === '') {
		errors.username.push("Username é um campo obrigatório");
		valid = false;
	}

	// password should not be blank
	if (password === '') {
		errors.password.push("Senha é um campo obrigatório");
	}
	else {
		// password should have at least 8 caracters
		if (password.length < 8) {
			errors.password.push("Senha precisa ter pelo menos 8 digitos");
			valid = false;
		}

		// password should have at leats one number
		if (!hasNumber(password)) {
			errors.password.push("Senha precisa ter pelo menos 1 número");
			valid = false;
		}

		// password should have at least one letter
		if (!hasLetter(password)) {
			errors.password.push("Senha precisa ter pelo menos 1 letra");
			valid = false;
		}

		// password should have at least one special caracter
		if (!hasSpecialChar(password)) {
			errors.password.push("Senha precisa ter pelo menos 1 caracter especial");
			valid = false;
		}
	}

	// confirmation password should not be blank
	if (confPassword === '') {
		errors.confPassword.push("Senha é um campo obrigatório");
		valid = false;
	} else {
		// confirmation password need to be equals to the password
		if (password !== confPassword) {
			errors.confPassword.push("As senhas precisam ser iguais");
			valid = false;
		}
	}
	return [valid, errors];
}
