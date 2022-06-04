//import { Link } from 'react-router-dom';
import React from 'react';
import './Signup.css';
import { useState } from 'react';
import axios from "axios";

function Signup() {

    const [user, setUser] = useState({
        mailID: "",
        password: "",
        confirmpassword: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })

    }

    function register() {
        const { mailID, password, confirmpassword } = user
        if (mailID && password && (password === confirmpassword)) {
            axios.post("http://localhost:5000/register", user)
                .then(res => console.log(res))
        }
        else {
            alert("invalid input")
        }
    }
    return (
        <div className='signup'>
            {console.log(user)}
            <h2>LOGO</h2>
            <p>Create New Account</p>
            <div className="mailid">
                <input placeholder="mailID" name="mailID" value={user.mailID} onChange={handleChange}></input>
            </div>
            <div className="password">
                <input type="password" placeholder="password" name="password" value={user.password} onChange={handleChange}></input>
            </div>
            <div className="confirm">
                <input type="password" placeholder="confirmpassword" name="confirmpassword" value={user.confirmpassword} onChange={handleChange}></input>
            </div>
            <div className="sign">
                <button className='btn' onClick={register}>sign up</button>
            </div>
        </div>
    );
}

export default Signup;
