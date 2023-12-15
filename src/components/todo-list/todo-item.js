import React from 'react';

import './todo-item.css';

const TodoItem = ({todoItem, onFinishTodo, fireBase, onDelete}) => {
    const {id, finish, text, idInFireBase} = todoItem;
    return (
        <>
            <div className={"todo"}>
                <div className={"todo_lists"}>
                    <div className={"todo_item"}>
                        <input type="checkbox" className="custom-checkbox" id={"happy" + id} name="happy" value="yes" checked={finish} onChange={() => {
                            onFinishTodo(id)
                            const changeFinish = {
                                finish: !finish
                            }
                            fireBase.sendNote("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/" + localStorage.getItem("userIdInBase") + "/todos/" + idInFireBase + ".json", changeFinish, "PATCH")
                                .then(data => console.log(data))
                        }}/>
                        <label htmlFor={"happy" + id} className={"todo_item_text"}>{text}.</label>
                        <button className={"todo_item_delete"} onClick={() => {
                            onDelete(id);
                            fireBase.sendNote("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/" + localStorage.getItem("userIdInBase") + "/todos/" + idInFireBase + ".json", null, "DELETE")
                                .then(data => console.log(data))
                        }}>X</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoItem;
