   import { useState } from 'react'
   import { useNavigate } from 'react-router-dom'
   import { loginUser } from '../api/auth'
   import { useAuth } from '../context/AuthContext'

   function Login() {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [loading, setLoading] = useState(false)

     const { login } = useAuth()
     const navigate = useNavigate()

     async function handleSubmit(e) {
       e.preventDefault()
       setError('')
       setLoading(true)

       try {
         const data = await loginUser(email, password)
         login(data.user, data.token)
         navigate('/')
       } catch (err) {
         const message = err.response?.data?.error || 'Something went wrong. Please try again.'
         setError(message)
       } finally {
         setLoading(false)
       }
     }

     return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <form
           onSubmit={handleSubmit}
           className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
         >
           <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
             UNIDESK Login
           </h1>

           {error && (
             <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4">
               {error}
             </div>
           )}

           <label className="block text-sm font-medium text-gray-700 mb-1">
             Email
           </label>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
           />

           <label className="block text-sm font-medium text-gray-700 mb-1">
             Password
           </label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
           />

           <button
             type="submit"
             disabled={loading}
             className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
           >
             {loading ? 'Logging in...' : 'Log In'}
           </button>
         </form>
       </div>
     )
   }

   export default Login

