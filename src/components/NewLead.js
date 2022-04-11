import React from "react";
import { ToastContainer } from 'react-toastify';

import CheckboxDiv from "./CheckboxDiv";
import InputDiv from "./InputDiv";

import 'react-toastify/dist/ReactToastify.css';

const NewLead = ({ information, errors, checkbox, toast, all, onSubmit, onClick, onChange, onCheck }) => {
	return (
		<div className="new-lead">
			<button onClick={onClick} className="BUTTON_MAT">Voltar</button>
			<form onSubmit={onSubmit}>
				<div className="text-input">
					<InputDiv text="Nome" id="name" type="text" name="name" onChange={onChange} value={information.name} errors={errors.name} />
					<InputDiv text="Telefone" id="phone" type="text" name="phone" onChange={onChange} value={information.phone} errors={errors.phone} />
					<InputDiv text="Email" id="mail" type="text" name="mail" onChange={onChange} value={information.mail} errors={errors.mail} />
				</div>
				<div className="checkbox">
					<label className="title-op">Oportunidades</label>
					<CheckboxDiv text="Marcar Todos" id="all" name="all" onChange={onCheck} checked={all} />
					<CheckboxDiv text="RPA" id="rpa" name="rpa" onChange={onCheck} checked={checkbox.rpa} />
					<CheckboxDiv text="Produto Digital" id="dig-prod" name="digProd" onChange={onCheck} checked={checkbox.digProd} />
					<CheckboxDiv text="Analystics" id="analystics" name="analystics" onChange={onCheck} checked={checkbox.analystics} />
					<CheckboxDiv text="BPM" id="bpm" name="bpm" onChange={onCheck} checked={checkbox.bpm} />
					<div>
						{errors.checkbox.map((erro, index) => (<label className="errors" key={index}>{erro}</label>))}
					</div>
					<button className="BUTTON_MAT">Registrar</button>
				</div>
			</form>
			<ToastContainer autoClose={10000} />
		</div>
	);
};

export default NewLead;
