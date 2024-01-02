import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
    const { isAuthenticated, logout, userEmail } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ background: '#333', padding: '10px', marginBottom: '20px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                <li>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
                        Home
                    </Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/class-scheduler" style={{ color: '#fff', textDecoration: 'none' }}>
                                Class Scheduler
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
