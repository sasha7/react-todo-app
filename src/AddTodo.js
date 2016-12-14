import React, { Component } from 'react';

export class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let title = this.refs.inputItem.value;

    if (title.length > 0) {
      this.props.addTodo(title);
    }

    this.refs.inputItem.value = '';
  }

  render() {
    return (
      <div className='add-todo'>
        <form onSubmit={ this.handleSubmit }>
          <input className='add-todo-input' type="text" placeholder="Add new Todo" ref="inputItem" />
          <button className="add-todo-button" type="button" onClick={ this.handleSubmit }>
            Add
          </button>
        </form>
      </div>
    )
  }
}
