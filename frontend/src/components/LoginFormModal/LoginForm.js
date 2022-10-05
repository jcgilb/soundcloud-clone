import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
// import { getSongs } from "../../store/songs";
// import GetAllSongs from "../GetAllSongs";
import "./LoginForm.css"

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // getters and setters for the login form
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if logged in, redirect to all songs
    if (sessionUser) <Redirect to="/songs" />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const response = dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (!errors) history.push('/songs')
        return response
    };

    return (
        <div className="login-container">
            <form className="l-form" onSubmit={handleSubmit}>
                <ul id="err">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>Username or Email</label>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br></br>
                <button className='signin' type="submit">Log In</button>
                <button className='demo-user'
                    onClick={() => {
                        // demo user login credentials
                        setCredential("jojoG")
                        setPassword("password")
                    }}
                    type="submit">Demo User</button>
                <br></br>
            </form>
        </div>
    );
}

export default LoginForm;