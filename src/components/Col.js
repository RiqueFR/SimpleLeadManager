import React from "react";
import { Droppable } from "react-beautiful-dnd";

import LeadObj from "./LeadObj";

const getListStyle = snapshot => ({
	transition: "background-colour 0.2s ease",
	background: snapshot.isDraggingOver ? 'lightblue' : 'white',
});

class Col extends React.Component {
	render() {
		return (
			<div className="col">
				<h2 className="title">{this.props.title}</h2>
				<Droppable droppableId={this.props.dropId}>
					{
						(provided, snapshot) => (
							<div
								className="content"
								ref={provided.innerRef}
								{...provided.droppableProps}
								style={getListStyle(snapshot)}
							>
								{this.props.data.map((lead, index) => {
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

export default Col;
