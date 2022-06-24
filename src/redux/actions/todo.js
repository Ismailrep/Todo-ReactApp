import Axios from 'axios';

export const incrementTodoCount = () => {
    return{
      type: "INCREMENT_TODO_COUNT"
    }
}
  
export const decrementTodoCount = () => {
    return{
      type: "DECREMENT_TODO_COUNT"
    }
}
  
export const changeTodoCount = newCount => {
    return {
      type: "CHANGE_TODO_COUNT",
      payload: newCount
    }
}

export const fetchTodo = () => {
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

export const deleteTodo = (id) => {
    Axios.delete("http://localhost:2000/todo/" + id)
    .then (() => {
      alert("Berhasil delete");
      this.props.fetchTodoGlobal()
    })
  }

export const completeTodo = (id) =>{
    Axios.patch("http://localhost:2000/todo/" + id, {
      isFinished: true
    })
    .then(() =>{
      alert("Horee")
      this.props.fetchTodoGlobal()
    })
    .catch(() =>{
      alert("server error")
    })
  }

export const fetchTodoGlobal = () => {
    return(dispatch) =>{
        Axios.get("http://localhost:2000/todo")
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: "GET_TODO",
                payload: response.data
            })
            dispatch({
                type: "CHANGE_TODO_COUNT",
                payload: response.data.length
            })
        })
        .catch(() => {
            alert("server error")
        });
    }
};