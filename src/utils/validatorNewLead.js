function hasOnlyNumbers(string) {
	return /^\d+$/.test(string);
}

function hasValidEmail(string) {
	// Don't allow more than one @
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
}

export default function validateNewLead(name, phone, mail, checkbox) {
	// inputs validation
	let errors= {
		name: [],
		phone: [],
		mail: [],
		checkbox: []
	};
	let valid = true;

	// username should not be blank
	if (name === '') {
		errors.name.push("Nome é um campo obrigatório");
		valid = false;
	}

	// password should not be blank
	if (phone === '') {
		errors.phone.push("Telefone é um campo obrigatório");
		valid = false;
	} else {
		if (!hasOnlyNumbers(phone)) {
			errors.phone.push("Telefone só pode receber números");
			valid = false;
		}
		if (!(phone.length === 10 || phone.length === 11)) {
			errors.phone.push("Informe um Telefone válido, com DDD + Número");
			valid = false;
		}
	}

	// confirmation password should not be blank
	if (mail === '') {
		errors.mail.push("Email é um campo obrigatório");
		valid = false;
	} else {
		if(!hasValidEmail(mail)) {
			errors.mail.push("Insira um Email válido");
			valid = false;
		}
	}

	let anyChecked = false;
	for (let key in checkbox) {
		if (checkbox[key] === true && key !== "all")
			anyChecked = true;
	}
	if (!anyChecked) {
		errors.checkbox.push("Marque pelo menos uma caixa");
		valid = false;
	}

	return [valid, errors];
}
