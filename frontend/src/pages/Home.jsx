import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center">
            <div className="text-center text-white max-w-lg">
                {/* Logo or Website Name */}
                <h1 className="text-4xl font-bold">Welcome to AuthFi</h1>
                <p className="mt-4 text-lg text-gray-200">
                    Secure and reliable authentication made simple. Join us today!
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/signup"
                        className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Home
