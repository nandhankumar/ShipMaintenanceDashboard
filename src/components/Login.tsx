import React, { useState } from 'react';
import { getData, saveData, addNotification } from '../utils/storage';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = getData();
        const user = data.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            data.currentUser = user;
            saveData(data);
            addNotification(`User ${user.email} logged in`, 'System');
            onLogin();
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div id="login-page" className="container">
            <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
                <h1 className="text-center mb-20"></h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input 
                            type="email" 
                            id="login-email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input 
                            type="password" 
                            id="login-password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;