import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
// import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/songs" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const response = dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                console.log("data returned from login", data)
                if (data && data.errors) setErrors(data.errors);
                if (!data.errors) return history.push('/songs')
            });
        // if (errors.length === 0) history.push('/songs')
        return response
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='the-guts'>
                <br></br>
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
                        setCredential("jojoG")
                        setPassword("password")
                    }}
                    type="submit">Demo User</button>
                <br></br>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
        </form>
    );
};

export default LoginFormPage;