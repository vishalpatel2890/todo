import React, { PropTypes, Component } from 'react'
import ListItem from './ListItem'


export default class List extends Component {
  constructor(props, context,) {
    super(props, context);
  }
  render(){
    const { remove, items, moveItem, removeItem, listId} = this.props;
    let handlelistItems = items.map((item, index) => {
      return (
        <ListItem item={item} listId={listId} key={item.id} index={index} remove={remove} moveItem={moveItem} removeItem={removeItem}/>
      )
    });
    return  (
      <div id="panel panel default">
        {handlelistItems}
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
}
