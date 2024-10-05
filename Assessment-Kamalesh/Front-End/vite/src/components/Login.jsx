import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [mailId, setMailId] = useState('');
    const [password, setPassword] = useState('');
    const [newMailId, setNewMailId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!mailId || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail_id: mailId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred while logging in.');
        }
    };

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newMailId || !newPassword) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail_id: newMailId, password: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('User created successfully.');
                setNewMailId('');
                setNewPassword('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error adding user:', err);
            setError('An error occurred while creating the user.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <label htmlFor="mailId" className="block mb-1 text-gray-700">Mail ID:</label>
                        <input
                            type="email"
                            id="mailId"
                            value={mailId}
                            autoComplete="new-email"
                            onChange={(e) => setMailId(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                    {success && <p className="text-green-500 text-xs mb-3">{success}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition duration-200">Login</button>
                </form>

                <h2 className="text-2xl font-semibold text-center my-4">Add New User</h2>
                <form onSubmit={handleNewUserSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newMailId" className="block mb-1 text-gray-700">New Mail ID:</label>
                        <input
                            type="email"
                            id="newMailId"
                            value={newMailId}
                            autoComplete="new-email"
                            onChange={(e) => setNewMailId(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block mb-1 text-gray-700">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            autoComplete="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white rounded py-2 hover:bg-green-600 transition duration-200">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
