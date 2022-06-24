import React from "react";

class TodoItem extends React.Component {

    deleteBtnHandler() {
        alert(`Menghapus list`);
    }
    btnHandler(type) {
        alert(`Task ${type}`);
    }

    render(){
        return (
            <div className="my-2 todo-item-container d-flex flex-row justify-content-between align-items-center">
             {this.props.todoData.id}. {this.props.todoData.activity}
            <div>
              <button 
              onClick={ () => this.props.deleteTodoHandler(this.props.todoData.id)} 
              className='mx-1 btn btn-danger'>
                Delete
              </button>
              <button 
              disabled={this.props.todoData.isFinished} 
              onClick={ () => this.props.completeTodoHandler(this.props.todoData.id)} 
              className='btn btn-success mx-1'>
                {
                    this.props.todoData.isFinished ? <strong>Finished</strong>: <em>Complete</em>
                }
              </button>
            </div>
          </div>
        )
    }
}

export default TodoItem;