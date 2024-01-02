import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from './Utils';

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (!isValidEmail(email)) {
                alert('Invalid email address');
                return;
            }
            await onRegister(name, email, password);
            alert(`Registration Done, Thank You!`);
        } catch (error) {
            alert(`Registration failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Teacher Registration</h2>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
