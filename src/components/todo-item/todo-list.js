import React, {Component} from 'react';
import {connect} from "react-redux";
import TodoItem from "../todo-list/todo-item";
import withFireBaseService from "../hoc/with-fireBase-service";
import {todoLoaded, todoLoading, onFinishTodo, todoError, onDelete} from "../../actions";
import Spinner from "../spinner";
import Error from "../error";

import {Link} from "react-router-dom";
import './todo-list.css';


class TodoList extends Component {
    componentDidMount() {
        this.props.todoLoading();

        const massiveWithTodos = [];
        this.props.FireBase.getNotes("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/" + localStorage.getItem("userIdInBase") + "/todos.json" )
            .then(data => {
                for (let key in data) {
                    massiveWithTodos.push(data[key])
                }
                this.props.todoLoaded(massiveWithTodos);
            })
            .catch(err => {
                this.props.todoError();
            })
        console.log(this.props.todos)
    }

    render() {
        const {todos, loading, error, onFinishTodo, onDelete, FireBase} = this.props;
        const currentDate = new Date().toLocaleDateString();
        const tomorrow = new Date().getTime() + 86400000;
        const dayAfterTomorrow = new Date().getTime() + 86400000*2;

        const todosList = function (day) {
            let same = false;
            todos.map(item => {
                if (item.time === day) {
                    same = true;
                }
            })
            if (same) {
              return todos.map(item => {
                    if (item.time === day) {
                        return <TodoItem key={item.id} todoItem={item} onFinishTodo={onFinishTodo} fireBase={FireBase} onDelete={onDelete}/>
                    }
                })
            } else {
                return <p className={"todo_status_text"}>There are not activities today</p>
            }
        }

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }
        return (
            <>
                <div className={"todos_wrapper"}>
                    <div className={"todo_title"}>
                        <h3>Today activity</h3>
                        {
                            todosList(currentDate)
                            /*todos.map(item => {
                                if (item.time === currentDate) {
                                    return <TodoItem key={item.id} todoItem={item} onFinishTodo={onFinishTodo} fireBase={this.props.FireBase} onDelete={onDelete}/>
                                }
                            })*/
                        }
                    </div>
                    <div className={"todo_title"}>
                        <h3>Tomorrow activity</h3>
                        {
                            todosList(new Date(tomorrow).toLocaleDateString())
                        }
                    </div>
                    <div className={"todo_title"}>
                        <h3>The day after tomorrow</h3>
                        {
                            todosList(new Date(dayAfterTomorrow).toLocaleDateString())
                        }
                    </div>
                    <Link className={"addTodo_wrapper"} to="/add_note">
                        <button className={"addTodo_button"}>Add todo</button>
                    </Link>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        todoLoading: () => {
            dispatch(todoLoading());
        },
        todoLoaded: (newTodo) => {
            dispatch(todoLoaded(newTodo))
        },
        onFinishTodo: (id) => {
            dispatch(onFinishTodo(id))
        },
        todoError: (id) => {
            dispatch(todoError())
        },
        onDelete: (id) => {
            dispatch(onDelete(id))
        },
    }
}

export default withFireBaseService()(connect(mapStateToProps, mapDispatchToProps)(TodoList));
