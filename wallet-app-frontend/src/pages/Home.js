import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-cover bg-center text-white">
            <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 p-6">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Wallet App</h1>
                <p className="text-xl md:text-2xl mb-6">Manage your expenses and income seamlessly.</p>

                <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/login" className="text-lg">
                        <button className="bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                            Login
                        </button>
                    </Link>
                    <Link to="/register" className="text-lg">
                        <button className="bg-accent text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
