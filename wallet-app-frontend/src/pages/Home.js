import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div
            className="min-h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: "url('https://example.com/background.jpg')",
            }}
        >
            <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
                    Welcome to Wallet App
                </h1>
                <p className="text-lg md:text-xl mb-6 text-center">
                    Seamlessly manage your expenses and income to achieve financial freedom.
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                    <Link to="/login">
                        <button className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-green-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
