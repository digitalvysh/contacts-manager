//import { Link } from 'react-router-dom';
import React from 'react';
import './Login.css';
import axios from "axios";
import { useState } from 'react';

function Login() {
    const [user, setUser] = useState({
        userID: "",
        password: ""
    })

    async function handleChange(e) {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    async function login() {
        axios.post("http://localhost:5000/login", user)
            .then(res => console.log(res))
    }
    return (
        <div className='login'>
            {console.log(user)}
            <h2>LOGO</h2>
            <p>Enter your credentials to access your account</p>
            <div className="userID">
                <input placeholder="userID" name="userID" value={user.userID} onChange={handleChange}></input>
            </div>
            <div className="password">
                <input type="password" placeholder="password" name="password" value={user.password} onChange={handleChange}></input>
            </div>
            <div className="in">
                <button onClick={login}>login</button>
            </div>
            <div className="signup">
                <button type="submit">sign up</button>
            </div>
        </div>
    );
}

export default Login;