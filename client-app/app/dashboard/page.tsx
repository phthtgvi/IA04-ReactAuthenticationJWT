'use client'

import { ProtectedRoute } from '../../components/ProtectedRoute'
import { useAuth } from '../../contexts/AuthContext'
import { useLogout, useUserProfile } from '../../hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: profile, isLoading, error } = useUserProfile()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50"
                >
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Welcome Back!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You are successfully authenticated and can access protected content.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">User ID:</span> {user?.id}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Profile Information
                  </h2>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : error ? (
                    <p className="text-red-600 text-sm">
                      Failed to load profile information
                    </p>
                  ) : profile ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Email:</span> {profile.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Account Created:</span>{' '}
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Authentication Features
                </h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>✓ JWT Access Token (15 minutes expiry)</li>
                  <li>✓ Refresh Token (7 days expiry)</li>
                  <li>✓ Automatic token refresh on API calls</li>
                  <li>✓ Protected routes with authentication guards</li>
                  <li>✓ Secure logout with token cleanup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
