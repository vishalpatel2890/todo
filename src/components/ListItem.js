import React, { PropTypes, Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../constants/appConstants';

class ListItem extends Component {
  constructor(props, context,) {
    super(props, context);
  }

  render(){
    const {  connectDragSource, isDragging, connectDropTarget, index, item, remove} = this.props;

      return connectDragSource(
        <div key={index} className="panel panel-default" id="listGroup" style={{
        opacity: isDragging ? 1 : 1,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
          <span
            className="glyphicon glyphicon-trash" id="customglyph"
            onClick={remove.bind(null,index)}
            >
          </span>
          <span id="todoItem">
            {item.text}
          </span>
        </div>
      )
    };

  }

const listDragSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      item: props.item
  };
},

  endDrag(props, monitor) {
  const item = monitor.getItem();
  const dropResult = monitor.getDropResult();

  if ( dropResult && dropResult.listId !== item.listId ) {
  			props.removeItem(item.index);
  		}
},
}



function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

ListItem.propTypes = {

  connectDragSource: React.PropTypes.func,


};


export default
  DragSource(ItemTypes.LIST_ITEM, listDragSource, collect)(ListItem);
