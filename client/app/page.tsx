import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to User Registration
                </h1>
                <p className="text-gray-600 mb-8">
                    A simple and secure user registration system built with Next.js and NestJS
                </p>

                <div className="space-y-4">
                    <Link
                        href="/signup"
                        className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
                    >
                        Get Started - Sign Up
                    </Link>

                    <Link
                        href="/login"
                        className="block w-full bg-white text-indigo-600 py-3 px-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition duration-200 font-semibold"
                    >
                        Already have an account? Login
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Features:</h2>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>Secure password hashing</li>
                        <li>Email validation</li>
                        <li>Real-time form validation</li>
                        <li>User-friendly error messages</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}