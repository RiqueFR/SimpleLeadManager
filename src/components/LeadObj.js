import React from "react";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
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
						style={getItemStyle(
								snapshot.isDragging,
								provided.draggableProps.style)
						}
					>
						{this.props.content}
					</div>
				)}
			</Draggable>
		);
	}
}

export default LeadObj;
