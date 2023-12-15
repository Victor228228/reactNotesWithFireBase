const todoLoaded = (newMenu) => {
    return {
        type: "TODO_LOADED",
        payload: newMenu
    };
};
const todoLoading = () => {
    return {
        type: "TODO_LOADING"
    };
};
const todoError = () => {
    return {
        type: "TODO_ERROR"
    };
};
const onAddTodo = (newTodo) => {
    return {
        type: "ADD_TODO",
        payload: newTodo
    }
};
const onFinishTodo = (id) => {
    return {
        type: "ON_FINISH",
        payload: id
    }
};
const onDelete = (id) => {
    return {
        type: "ON_DELETE",
        payload: id
    }
}


export {
    todoLoaded,
    todoLoading,
    todoError,
    onAddTodo,
    onFinishTodo,
    onDelete,
}