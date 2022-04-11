import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { updateLeadStatus, searchLeadsByStatus } from "../services/Lead";

import Lead from "../components/Lead";

const LeadController = () => {
	const [lists, setLists] = useState([
		searchLeadsByStatus("Cliente em Potencial"),
		searchLeadsByStatus("Dados Confirmados"),
		searchLeadsByStatus("Reuniao Agendada"),
	]);
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/lead/new");
	};

	const findColSourceById = (val) => {
		let res = null;
		for (let i = 0; i < 3; i++) {
			if (val === `col-${i+1}`) res = i;
		}
		return res;
	};

	const onDragStart = (result) => {
		const { source } = result;

		const sourceCol = findColSourceById(source.droppableId);

		if (sourceCol < 2){
			document.getElementsByClassName('content')[sourceCol+1].style.backgroundColor = 'lightgreen';
		}
	}

	const onDragEnd = (result) => {
		// back the old color if it has changed due to drag start
		let contents = document.getElementsByClassName('content');
		for (let content of contents) {
			content.style.backgroundColor = 'inherit';
		}

		// reorder the columns
		const { destination, source } = result;

		// if user drops out of a list
		if (!destination) {
			return;
		}

		// if user drops in the same list
		if (destination.droppableId === source.droppableId) {
			return;
		}

		// user drop on different list
		const destCol = findColSourceById(destination.droppableId);
		const sourceCol = findColSourceById(source.droppableId);

		// only allow drop on next list
		if(sourceCol + 1 !== destCol) return;

		// update lists (remove from source and add on destination)
		// copy lists to newCol
		const newCol = Array.from(lists);
		// find the lead that is being moved
		const lead = newCol[sourceCol][source.index];
		// remove from source list
		newCol[sourceCol].splice(source.index, 1);
		// add to destination list
		newCol[destCol].push(lead);
		// update lists
		setLists(newCol);

		// update status on local storage
		let status = null;
		if(destination.droppableId === "col-1") status = "Cliente em Potencial";
		else if(destination.droppableId === "col-2") status = "Dados Confirmados";
		else status = "Reuniao Agendada";
		updateLeadStatus(lead, status);
		return;
	};

	return (<Lead lists={lists} onClick={onClick} onDragStart={onDragStart} onDragEnd={onDragEnd} />);
};

export default LeadController;
