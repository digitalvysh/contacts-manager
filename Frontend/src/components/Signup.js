import { Link } from 'react-router-dom';
import React from 'react';
import './Signup.css';
import { useState } from 'react';
function Signup() {
    const [mailID, setMailID] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    async function signupuser() {
    }
    return (
        <div className='signup'>
            <form onSubmit={signupuser}>
                <h2>LOGO</h2>
                <p>Create New Account</p>
                <div className="mailid">
                    <input type="email" placeholder="mail ID" value={mailID} onChange={(e) => setMailID(e.target.value)}></input>
                </div>
                <div className="password">
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="confirm">
                    <input type="password" placeholder="confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)}></input>
                </div>
                <div className="sign">
                    <Link to="/Login"><button className='btn' type="submit">sign up</button></Link>
                </div>
            </form>
        </div>
    );
}
export default Signup;