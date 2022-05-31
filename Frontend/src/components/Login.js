import { Link } from 'react-router-dom';
import React from 'react';
import './Login.css';
import { useState } from 'react';
function Login() {
    const [userID, setuserID] = useState("");
    const [password, setPassword] = useState("")
    console.log(userID)
    console.log(password)
    return (
        <div className='login'>
            <form >
                <h2>LOGO</h2>
                <p>Enter your credentials to access your account</p>
                <div className="userID">
                    <input type="email" placeholder="user ID" value={userID} onChange={(e) => setuserID(e.target.value)}></input>
                </div>
                <div className="password">
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="in">
                    <Link to="/Contancts"><button type="submit">login</button></Link>
                </div>
                <div className="sign">
                    <Link to="/Signup"><button type="submit">sign up</button></Link>
                </div>
            </form>
        </div>
    );
}
export default Login;