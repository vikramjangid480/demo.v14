import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Shield, User, Lock } from 'lucide-react'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { user, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      router.push('/admin/panel')
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(credentials.username, credentials.password)
      router.push('/admin/panel')
    } catch (err) {
      // Enhanced error handling based on error type
      if (err.message?.toLowerCase().includes('password')) {
        setError('Incorrect password')
      } else if (err.message?.toLowerCase().includes('user') || err.message?.toLowerCase().includes('invalid')) {
        setError('Invalid login credentials')
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Head>
        <title>Admin Access - Boganto</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)'
        }}
      >
        <div className="max-w-md w-full">
          {/* Main Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div 
              className="px-8 py-8 text-center text-white relative"
              style={{
                background: 'linear-gradient(135deg, #ff5722 0%, #f4511e 100%)'
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
              <p className="text-orange-100 text-sm">Boganto Blog Administration</p>
            </div>

            {/* Form Section */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={credentials.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Demo Credentials:</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Username:</span> 
                    <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs font-mono">admin123</code>
                  </div>
                  <div>
                    <span className="font-medium">Password:</span> 
                    <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs font-mono">secure@123</code>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Use these credentials to access the admin panel
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 text-center">
              <p className="text-xs text-gray-500">
                Secured by Boganto Blog System<br />
                © 2024 All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin