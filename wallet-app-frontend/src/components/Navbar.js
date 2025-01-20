import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    <Link to="/">Wallet App</Link>
                </h1>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/transactions"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Transactions
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Reports
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/notifications"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Notifications
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-red-500 font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden focus:outline-none text-gray-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <ul className="md:hidden bg-gray-100 space-y-2 p-4 shadow-inner">
                    <li>
                        <Link
                            to="/dashboard"
                            className="block text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className="block text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Reports
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/notifications"
                            className="block text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Notifications
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left text-gray-600 hover:text-red-500 font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="block text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="block text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
