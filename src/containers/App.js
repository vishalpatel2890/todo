import React, { Component, PropTypes } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from '../components/List';
import AddItem from '../components/AddItem';
import Panel from '../components/Panel'
import * as TodoActions from '../actions/TodoActions'


class App extends Component {
  render() {
    const { todos, actions } = this.props

    const list = [
      {id: 1, text: "tet"},
      {id: 2, text : "test"}

    ];

    return (
        <div className="container">
          <div className="container">
          <Panel day="Monday" id={1} items={list} />
          <Panel day="Tuesday" id={2} items={list} />
          <Panel day="ToDo" id={10}  />
        </div>

      <div className="container">
        <Panel day="Wednesday" id={3} items={list} />
        <Panel day="Thursday" id={4} items={list} />
        <Panel day="Friday"   id={5} items={list} />
      </div>
      </div>



    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}




export default compose(
  DragDropContext(HTML5Backend))(App)
