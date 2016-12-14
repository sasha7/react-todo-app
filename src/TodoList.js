import React from 'react';
import { Todo } from './Todo';

export var TodoList = (props) => {

  return (
    <ul className='todos-list'>
      { props.todos.map((todo) => 
        <Todo 
          key={ todo.id.toString() } 
          { ...todo } 
          removeTodo={ props.removeTodo }
          toggleTodo={ props.toggleTodo }
        />
      ) }
    </ul>
    );
}