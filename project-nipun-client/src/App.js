import React, { useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Navbar';
import Register from './Register';
import Login from './Login';
import ClassScheduler from './ClassScheduler';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    const handleRegister = async (name, email, password) => {
        try {
            // Perform registration logic, make an API request
            const response = await fetch('http://localhost:4000/api/register-teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setLoggedIn(true);
                setIsTeacher(true);
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:4000/api/login-teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setLoggedIn(true);
                setIsTeacher(true);
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const HomePage = () => (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ color: '#007BFF' }}>Welcome</h1>
            <p style={{ color: '#333', lineHeight: '1.6' }}>Explore the amazing features and schedule your classes effortlessly.</p>
            <a href="/login" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#28A745', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>
                Get Started
            </a>
        </div>
    );

    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register onRegister={handleRegister} />} />
                    <Route
                        path="/login"
                        element={
                            loggedIn ? (
                                <Navigate to="/class-scheduler" />
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/class-scheduler"
                        element={
                            loggedIn && isTeacher ? (
                                <ClassScheduler />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
