import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from "../services/Store";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function initialState() {
	return { lead: [],}
}

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
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class LeadObj extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.dragId} index={this.props.index}>
				{(provided, snapshot) => (
					<div className="obj"
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						style={getItemStyle(
							snapshot.isDragging,
							provided.draggableProps.style
						)}
					>
						{this.props.content}
					</div>
				)}
			</Draggable>
		);
	}
}

class Col extends React.Component {
	leads = getDataFromLocalStorage('lead');
	render() {
		return (
			<Droppable droppableId={this.props.dropId} direction="horizontal">
				{
					(provided, snapshot) => (
						<div
							className="content"
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{this.props.data.map((lead, index) => {
								if (lead)
									return <LeadObj key={index} dragId={`drag-${index}`} index={index} content={lead.name} />
										else
									return <LeadObj key={index} dragId={`drag-${index}`} index={index} content="null" />
							})}
							{provided.placeholder}
						</div>
					)
				}
			</Droppable>
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
	const [values, setValues] = useState(initialState);
	const navigate = useNavigate();

	const leads = getDataFromLocalStorage('lead');

	const onClick = (event) => {
		navigate("/lead/new");
	};

	const onDragEnd = () => {
		// reaorder the columns
	};

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
};
/*
			<Row dropId="drop-1" data={teste} />
			<Row dropId="drop-2" data={teste} />
			<Row dropId="drop-3" data={teste} />
				*/
export default Lead;
