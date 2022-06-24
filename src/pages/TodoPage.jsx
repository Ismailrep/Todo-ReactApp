import React from 'react';
import '../style.css';
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from '../components/TodoItem';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
  changeTodoCount,
  decrementTodoCount,
  incrementTodoCount,
  fetchTodoGlobal
} from '../redux/actions/todo';



class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: "",
  }

  fetchTodo = () => {
    Axios.get("http://localhost:2000/todo")
    .then((response) => {
      console.log(response.data)
      this.setState({ todoList: response.data });
      this.props.changeTodoCount(response.data.length);
    })
    .catch(() => {
      alert("server error")
    })
  }

  deleteTodo = (id) => {
    Axios.delete("http://localhost:2000/todo/" + id)
    .then (() => {
      // alert("Berhasil delete");
      this.props.fetchTodoGlobal();
    })
  }

  completeTodo = (id) =>{
    Axios.patch("http://localhost:2000/todo/" + id, {
      isFinished: true
    })
    .then(() =>{
      // alert("Horee")
      this.props.fetchTodoGlobal()
    })
    .catch(() =>{
      alert("server error")
    })
  }

  renderTodoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <TodoItem 
        completeTodoHandler={this.completeTodo} 
        deleteTodoHandler={this.deleteTodo} 
        todoData={val} 
        />
      )
    })
  }

  addTodo = () =>{
    Axios.post("http://localhost:2000/todo", { 
      activity: this.state.inputTodo,
      isFinished: false,
    })
    .then(() => {
      // alert("berhasil menambahkan")
      this.props.fetchTodoGlobal()
    })
  }

  inputHandler = (e) =>{
    this.setState({ inputTodo: e.target.value });
  }

  componentDidMount() {
    this.props.fetchTodoGlobal();
  }

  render() {
    return (
      <div className='todo-item-container'>
        <h1>Todo List</h1>
        {/* <button className='btn btn-info' onClick={this.fetchTodo}>
          Get my todo list {this.props.todoGlobalState.todoCount}
        </button> */}
        { this.renderTodoList() }
        <div className='mt-3'>
          <input onChange={this.inputHandler} type="text" className='mx-3 align-middle' placeholder='Input task'/>
          <button onClick={this.addTodo} className='btn btn-primary'>Add Todo</button>
          
          {/* Fail feature */}
          {/* <button className='btn btn-warning' onClick={this.props.incrementTodoCount}>
            Increment Todo
          </button>
          <button className='btn btn-info' onClick={this.props.decrementTodoCount}>
            Decrement Todo
          </button>
          <button onClick={()=> this.props.changeTodoCount(7)} className='btn btn-dark'>
            Change Todo
          </button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state.todo.todoCount
  return {
    todoGlobalState: state.todo,
  }
}

const mapDispatchToProps = {
  incrementTodoCount,
  decrementTodoCount,
  changeTodoCount,
  fetchTodoGlobal
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);