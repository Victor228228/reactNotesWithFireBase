import {act} from "react-dom/test-utils";

const initialState = {  //редакс сторе работает не так как обычный стейт. При обычном стейте если ме перезаписываем какое-то свойство, то меняется только оно, а например второе свойство остается не изменным. А при изменении стора в редаксе он полностью перезаписывается на новый
    todos: [],
    loading: true,
    error: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TODO_LOADED": return {
            ...state, //при помощи спред оператора раскрываем сюда весь предыдущий стейт, а ниже уже меняет нужные нам свойства. делается для того что бы свойства не пропали которые мы не меняем тут ниже
            todos: action.payload,
            loading: false,
            error: false
        };
        case "TODO_LOADING": return {
            ...state,
            todos: state.todos,
            loading: true,
            error: false
        };
        case "TODO_ERROR": return {
            ...state,
            todos: [],
            loading: false,
            error: true
        };
        case "ADD_TODO":
            const newTodo = action.payload
            console.log(newTodo)
            return {
                ...state,
                todos: [...state.todos, newTodo]
            };
        case "ON_FINISH":
            const id = action.payload;
            const todoIndex = state.todos.findIndex(item => item.id === id)
            const changeTodo = {
                finish: !state.todos[todoIndex].finish,
                id: state.todos[todoIndex].id,
                text: state.todos[todoIndex].text,
                time: state.todos[todoIndex].time,
                convertingTime: state.todos[todoIndex].convertingTime,
                idInFireBase: state.todos[todoIndex].idInFireBase
            }
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, todoIndex),
                    changeTodo,
                    ...state.todos.slice(todoIndex + 1)
                ]
            };
        case "ON_DELETE":
            const indexDeleteItem = state.todos.findIndex(item => item.id === action.payload);
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, indexDeleteItem),
                    ...state.todos.slice(indexDeleteItem + 1)
                ]
            };


        default: return state;
    }
}

export default reducer;