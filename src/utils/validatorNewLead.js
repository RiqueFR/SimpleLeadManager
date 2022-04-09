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
	}

	// confirmation password should not be blank
	if (mail === '') {
		errors.mail.push("Email é um campo obrigatório");
		valid = false;
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