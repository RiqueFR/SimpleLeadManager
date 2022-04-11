import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd'

import { getDataFromLocalStorage } from "../services/Store";
import { updateLeadStatus } from "../services/Lead";

import Col from "./Col";

const Lead = () => {
	const leadsByStatus = (leads, search) => {
		let result = [];
		for (let lead of leads) {
			if (lead.status === search) result.push(lead);
		}
		return (result);
	}

	const [leads, setLeads] = useState(getDataFromLocalStorage('lead'));
	const [lists, setLists] = useState([
		leadsByStatus(leads, "Cliente em Potencial"),
		leadsByStatus(leads, "Dados Confirmados"),
		leadsByStatus(leads, "Reuniao Agendada"),
	]);
	const navigate = useNavigate();

	const onClick = (event) => {
		navigate("/lead/new");
	};

	const onDragStart = (result) => {
		const { source } = result;
		let val = source.droppableId;
		let res = null;
		for (let i = 0; i < 3; i++) {
			if (val === `col-${i+1}`) res = i;
		}
		const sourceCol = res;

		if (sourceCol < 2)
			document.getElementsByClassName('content')[sourceCol+1].style.backgroundColor = 'lightgreen';
	}

	const onDragEnd = (result) => {
		// reaorder the columns
		const { destination, source, draggableId } = result;
		let contents = document.getElementsByClassName('content');
		for (let content of contents) {
			content.style.backgroundColor = 'inherit';
		}

		// if user drops out of a list
		if (!destination) {
			return;
		}

		// if user drops in the same list
		if (destination.droppableId === source.droppableId) {
			return;
		}

		// user drop on different list
		let val = destination.droppableId;
		let res = null;
		for (let i = 0; i < 3; i++) {
			if (val === `col-${i+1}`) res = i;
		}
		const destCol = res;
		
		val = source.droppableId;
		res = null;
		for (let i = 0; i < 3; i++) {
			if (val === `col-${i+1}`) res = i;
		}
		const sourceCol = res;

		// only allow drop on next list
		if(sourceCol + 1 !== destCol) return;

		const newCol = Array.from(lists);
		const lead = newCol[sourceCol][source.index];
		newCol[sourceCol].splice(source.index, 1);
		newCol[destCol].push(lead);
		setLists(newCol);
		let status = null;
		if(destination.droppableId === "col-1") status = "Cliente em Potencial";
		else if(destination.droppableId === "col-2") status = "Dados Confirmados";
		else status = "Reuniao Agendada";
		updateLeadStatus(lead, status);
		return;
	};

	return (
		<div className="lead">
			<button onClick={onClick}>Novo Lead (+)</button>
			<div className="table">
				<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
					<Col title="Cliente em Potencial" dropId="col-1" data={lists[0]} />
					<Col title="Dados Confirmados" dropId="col-2" data={lists[1]} />
					<Col title="Reunião Agendada" dropId="col-3" data={lists[2]} />
				</DragDropContext>
			</div>
		</div>
	);
};

export default Lead;
