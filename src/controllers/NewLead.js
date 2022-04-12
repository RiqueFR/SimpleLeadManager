import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerLead } from "../services/Lead";
import validateNewLead from "../utils/validatorNewLead";

import NewLead from '../components/NewLead';

const NewLeadController = () => {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		name: '',
		phone: '',
		mail: ''
	});
	const [errors, setErrors] = useState({
			name: [],
			phone: [],
			mail: [],
			checkbox: []
	});
	const [checkbox, setCheckbox] = useState({
			rpa: false,
			digProd: false,
			analystics: false,
			bpm: false
	});
	const [all, setAll] = useState(false);
	let valid = false;

	const onSubmit = (e) => {
		// prevent the page to reload and loose information
		e.preventDefault()

		// validate the inputs
		let localErrors = null;
		[ valid, localErrors ] = validateNewLead(inputs.name, inputs.phone, inputs.mail, checkbox);

		setErrors({
			...localErrors
		});
		if (valid) {
			// create the new data to be added
			const data = {
				name: inputs.name,
				phone: inputs.phone,
				mail: inputs.mail,
				opportunities: checkbox
			}
			// save to Local Storage
			registerLead(data);
			// message saying it is saved
			toast.success("Lead salvo", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	};

	const onClick = () => {
		navigate("/lead");
	};

	const onCheck = (event) => {
		const { checked, name } = event.target;

		// the all checkbox have a different behavior
		if (name === "all") { 
			setAll(checked);
			setCheckbox({
				rpa: checked,
				digProd: checked,
				analystics: checked,
				bpm: checked
			});
		} else {
			setCheckbox({
				...checkbox,
				[name]: checked
			});	
		}
	};

	const onPhoneChange = (event) => {
		const isNumber = (char) => {
			return (char >= '0' && char <= '9');
		};

		const { value } = event.target;
		if (value.legth > 11) return;
		let result = "";
		for (let index in value) {
			// check string size to limit by 11 digits
			if (index > 10) break;
			// check char by char and remove no number chars
			if (isNumber(value[index])) result += value[index];
		}
		setInputs({
			...inputs,
			phone: result
		});
	};

	const onChange = (event) => {
		const { value, name } = event.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	
	return (<NewLead information={inputs} checkbox={checkbox} errors={errors} all={all} toast={toast} onSubmit={onSubmit} onClick={onClick} onChange={onChange} onPhoneChange={onPhoneChange} onCheck={onCheck} />);
}

export default NewLeadController;
