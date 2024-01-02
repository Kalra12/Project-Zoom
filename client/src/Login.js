import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from './Utils';


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!isValidEmail(email)) {
                alert('Invalid email address');
                return;
            }
            await onLogin(email, password);
            navigate('/class-scheduler');
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Teacher Login</h2>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
