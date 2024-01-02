import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const login = async (email, password) => {
        try {
            setUserEmail(email);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
export default AuthContext;