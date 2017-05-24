import React, { PropTypes, Component } from 'react'
import update from 'react/lib/update';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { ItemTypes } from '../constants/appConstants';
import { DropTarget } from 'react-dnd';
import List from './List';
import AddItem from '../components/AddItem';
import * as TodoActions from '../actions/TodoActions'


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Panel extends Component {

  constructor(props) {
  super(props);
  this.state = { items: props.items };
}

pushItem(item) {
  this.setState(update(this.state, {
    items: {
      $push: [ item ]
    }
  }));
}

removeItem(index) {
  this.setState(update(this.state, {
    items: {
      $splice: [
        [index, 1]
      ]
    }
  }));
}

moveItem(dragIndex, hoverIndex) {
  const { items } = this.state;
  const dragItem = items[dragIndex];

  this.setState(update(this.state, {
    items: {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem]
      ]
    }
  }));
}



  render(){
    const { todos, actions } = this.props;
    const { connectDropTarget, canDrop, isOver, remove, day, id} = this.props;
    const { items } = this.state;
    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? 'lightgreen' : '#FFF';

    if (this.props.id === 10) {

    return connectDropTarget(
      <div style={{backgroundColor}}className="panel panel-primary" id="panel-width">
        <div className="panel-heading">
          <h3 className="panel-title"> {day} </h3>
        </div>
        <div className="panel-body" id="day">

            <div>
              <AddItem add={actions.addItem}/>
              <List items={todos} remove={actions.removeItem}/>
            </div>
          </div>
        </div>
    )
  }
else{
    return connectDropTarget(
      <div style={{backgroundColor}}className="panel panel-primary" id="panel-width">
        <div className="panel-heading">
          <h3 className="panel-title"> {day} </h3>
        </div>
        <div className="panel-body" id="day">

          <List items={items}
							remove={actions.removeItem}
              listId={this.props.id}
							removeItem={this.removeItem.bind(this)}
							moveItem={this.moveItem.bind(this)}  />
        </div>
      </div>

)
}
}
}

const itemTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if ( id !== sourceObj.listId ) component.pushItem(sourceObj.item);
		return {
			listId: id,

		};
	}
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default compose(DropTarget(ItemTypes.LIST_ITEM, itemTarget, collect),
connect(
mapStateToProps,
mapDispatchToProps
))(Panel);
