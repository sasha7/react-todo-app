// React App for managing a list of todos
// 
// App is using a RESTful API service via `mockapi.io`
// 
// Todo has the following attributes:
//   {
//     id: '1',
//     title: 'Todo 1',
//     completed: false
//   }

import React, { Component } from 'react';
import logo from './logo.svg';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import axios from 'axios';

const API_ENDPOINT = 'http://58373388d0fa601200408c0f.mockapi.io/api/v1';
const API_URL_TODOS = `${API_ENDPOINT}/todo/`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loadingTodos: false
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.loadTodos = this.loadTodos.bind(this);
  }

  componentDidMount() {
    this.loadTodos();
  }

  addTodo(todo) {
    // const id = '_' + Math.random().toString(36).substr(2, 9);

    const newTodo = {
      title: todo,
      completed: false
    };

    axios.post(API_URL_TODOS, newTodo).then((res) => {
      console.log('API: todo created', res.data);
      this.setState({
        todos: [res.data, ...this.state.todos]
      });

      // Update ID received from backend
      // let item = this.state.todos.find((todo) => todo.id === id);
      // if (item !== -1) {
      //   item.id = res.data.id;
      // }

      // this.setState({
      //   todos: this.state.todos
      // });

    });

  }

  removeTodo(id) {
    const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: filteredTodos
    });

    axios.delete(API_URL_TODOS + id).then((res) => {
      console.log('API: todo deleted', res.data);
    });

  }

  toggleTodo(id) {
    let item = this.state.todos.find((todo) => todo.id === id);
    if (item !== -1) {
      item.completed = !item.completed;
    }

    this.setState({
      todos: this.state.todos
    });

    axios.put(API_URL_TODOS + item.id, item).then((res) => {
      console.log('API: todo updated', res.data);
    });

  }

  loadTodos() {
    this.setState({
      loadingTodos: true
    });

    axios.get(API_URL_TODOS).then((res) => {
      this.setState({
        todos: res.data,
        loadingTodos: false
      });
    });
  }

  render() {

    const todosCount = this.state.todos.length;
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={ logo } className='App-logo' alt='logo' />
          <h2>Todo App</h2>
        </div>
        <p className='App-intro'>
          Easily manage your <strong onClick={ this.loadTodos }>Todos List</strong> (
          { todosCount })
        </p>
        <AddTodo addTodo={ this.addTodo } />
        <TodoList removeTodo={ this.removeTodo } toggleTodo={ this.toggleTodo } todos={ this.state.todos } />
        <p className={ `loading-indicator ${this.state.loadingTodos ? 'is-visible' : 'is-hidden'}` }>
          Loading...
        </p>
      </div>
    )
  }
}

export default App
