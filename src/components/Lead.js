import React from "react";
import { DragDropContext } from 'react-beautiful-dnd'

import Col from "./Col";

const Lead = ({ lists, onClick, onDragStart, onDragEnd }) => {
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
