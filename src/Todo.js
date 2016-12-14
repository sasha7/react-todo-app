import React, { Component } from 'react';

export class Todo extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.completed !== nextProps.completed) {
      return true;
    } else {
      return false;
    }
  }

  handleToggle(event) {
    this.props.toggleTodo(this.props.id);
  }

  handleRemove(event) {
    this.props.removeTodo(this.props.id);
  }

  render() {
    return (
      <li className={ `todo-item ${this.props.completed ? 'todo-item-completed' : ''}` }>
        <div className='todo-item-checkbox'><input type='checkbox' checked={`${this.props.completed ? 'checked' : ''}`} onChange={this.handleToggle} /></div>
        <div onClick={ this.handleToggle } className='todo-item-title'>
          { this.props.title }
        </div>
        <div className='todo-item-remove' onClick={ this.handleRemove }>x</div>
      </li>
    )
  }

}
;