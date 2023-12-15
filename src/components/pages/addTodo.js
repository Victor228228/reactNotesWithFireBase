import React from 'react';
import WithFireBaseService from "../hoc";
import {connect} from "react-redux";
import {onAddTodo} from "../../actions";

import {Link} from "react-router-dom";

import './addTodo.css';
import arrowBack from "./arrow.left.svg"

const AddTodo = ({FireBase, RenderId, onAddTodo}) => {
   const sendData = () => {
        const text = document.querySelector(".addNote_text");
        const todoDate = document.querySelector(".addNote_date");
        if (text.value !== "") {
            const msTodoDate = Date.parse(todoDate.value);
            const convertingTime = new Date(msTodoDate).toLocaleDateString();
            const data = {
                id: RenderId.renderId(),
                text: text.value,
                time: convertingTime,
                convertingTime: msTodoDate,
                finish: false,
                idInFireBase: null
            }
            FireBase.sendNote("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/" + localStorage.getItem("userIdInBase") + "/todos.json", data)
                .then(response => response.json())
                .then(dataFromFireBase => {
                    data.idInFireBase = dataFromFireBase.name
                    FireBase.sendNote("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/" + localStorage.getItem("userIdInBase") + "/todos/" + data.idInFireBase + ".json", data, "PATCH")
                    onAddTodo(data)
                })
            text.value = "";
            todoDate.value = ""
            console.log(data)
            /*var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
            var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
            console.log(followingDay.toLocaleDateString())*/
        }

    }

    return (
        <div className="addNote">
            <Link className={"addNote_header"} to="/">
                <img src={arrowBack} alt=""/>
                <p className={"addNote_header_text"}>Close</p>
            </Link>
            <h3 className={"addNote_title"}>Add todo</h3>
            <input type="text" placeholder={"new todo"} className={"addNote_text"}/>
            <input type="date" className={"addNote_date"}/>
            <Link className={"addNote_button"} to="/" onClick={() => sendData()}>Done</Link>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (newTodo) => {
            dispatch(onAddTodo(newTodo))
        }
    }
}

export default WithFireBaseService()(connect(null, mapDispatchToProps)(AddTodo));