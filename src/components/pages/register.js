import React from 'react';
import WithFireBaseService from "../hoc";

import './registration.css';


const Registration = ({FireBase}) => {

    function registrationOrLogin(url) {
        const parent = document.querySelector(".registration");
        const login = parent.querySelector(".registration_login");
        const pass = parent.querySelector(".registration_password");
        if (login.value !== "" && pass.value !== "") {
            const userData = {
                email: login.value,
                password: pass.value,
                returnSecureToken: true
            }
            console.log(userData)
            FireBase.sendNote(url, userData, "POST")
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("localId", data.localId);
                    localStorage.setItem("idToken", data.idToken);
                    localStorage.setItem("timeSessionLeft", data.expiresIn);

                    let userInformForMyDataBase = {
                        id: localStorage.getItem("localId"),
                        name: userData.email,
                        todos: "null"
                    }
                    FireBase.getNotes("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users.json")
                        .then(data => {
                            let same = false;
                            for (let key in data) {
                                if (data[key].id === userInformForMyDataBase.id) {
                                    same = true;
                                    localStorage.setItem("userIdInBase", data[key].userIdInBase);
                                    window.location.reload()
                                }
                            }
                            if (!same) {
                                FireBase.sendNote("https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users.json", userInformForMyDataBase)
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data)
                                        localStorage.setItem("userIdInBase", data.name);
                                        FireBase.sendNote(`https://mynotefirebase-7d1b6-default-rtdb.firebaseio.com/users/${data.name}/userIdInBase.json`, data.name, "PUT")
                                            .then(data => window.location.reload())
                                    })
                                ;
                            }
                        })
            }).catch(err => {
                parent.insertAdjacentHTML("beforeend", `
                    <p class="registration_error_description">Something wrong</p>
                `)
                setTimeout(function () {
                    parent.querySelector(".registration_error_description").remove()
                }, 2000)

            }).finally(() => {
                login.value = "";
                pass.value = "";
            })
        }
    }
    return (
        <div className="registration">
            <h3 className={"registration_title"}>If you want to use this shit, you have to register</h3>
            <input type="login" placeholder={"login"} className={"registration_login"}/>
            <input type="password" placeholder={"password"} className={"registration_password"}/>
            <button className={"registration_button"} onClick={() => registrationOrLogin("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFT21F9GZfjWdqCtu2n7ndu7fIol7To3Y")}>Login</button>
            <button className={"registration_button"} onClick={() => registrationOrLogin("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFT21F9GZfjWdqCtu2n7ndu7fIol7To3Y")}>Registration</button>
        </div>
    )
}

export default WithFireBaseService()(Registration);