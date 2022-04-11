import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from "../services/Store";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {updateLeadStatus} from "../services/Lead";


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  overflow: 'auto',
});

class LeadObj extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.dragId} index={this.props.indexDrag}>
				{(provided, snapshot) => (
					<div className="obj"
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						{this.props.content}
					</div>
				)}
			</Draggable>
		);
	}
}

class Col extends React.Component {
	render() {
		console.log("renderrr");
		return (
			<div className="col">
				<h2>{this.props.title}</h2>
				<Droppable droppableId={this.props.dropId}>
					{
						(provided, snapshot) => (
							<div
								className="content"
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{this.props.data.map((lead, index) => {
									console.log(`drag-${lead.id}`);
									return <LeadObj key={lead.id} dragId={`drag-${lead.id}`} indexDrag={index} content={lead.name} />;
								})}
								{provided.placeholder}
							</div>
						)
					}
				</Droppable>
			</div>
		);
	}
}

class Row extends React.Component {
	render() {
		return(
				<DragDropContext onDragEnd={this.props.onDragEnd}>
					<Col dropId={this.props.dropId} data={this.props.data} />
				</DragDropContext>
		);
	}
}

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


	const onDragEnd = (result) => {
		// reaorder the columns
		const { destination, source, draggableId } = result;

		// if user drops out of a list
		if (!destination) {
			console.log("out1");
			return;
		}

		// if user drops in the same list
		if (destination.droppableId === source.droppableId) {
			console.log("out2");
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

		const newCol = Array.from(lists);
		console.log(newCol);
		const lead = newCol[sourceCol][source.index];
		console.log(lead);
		newCol[sourceCol].splice(source.index, 1);
		newCol[destCol].push(lead);
		console.log(newCol);
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
				<DragDropContext onDragEnd={onDragEnd}>
					<Col title="Cliente em Potencial" dropId="col-1" data={lists[0]} />
					<Col title="Dados Confirmados" dropId="col-2" data={lists[1]} />
					<Col title="Reunião Agendada" dropId="col-3" data={lists[2]} />
				</DragDropContext>
			</div>
		</div>
	);

	/*
	return (
		<div className="lead">
			<button onClick={onClick}>Novo Lead (+)</button>
			<div className="table">
				{leads.map((lead, index) => {
					return (
						<Row key={index} dropId={`drop-${index}`} data={[lead, null, null]} />
					);
				})}
			</div>
		</div>
	);
	*/
};

export default Lead;
