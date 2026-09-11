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
       <div className="min-h-screen bg-bg flex items-center justify-center">
         <form
           onSubmit={handleSubmit}
           className="bg-surface border border-border p-8 rounded-2xl w-full max-w-sm"
         >
           <h1 className="text-2xl font-bold text-accent mb-6 text-center">
             UNIDESK Login
           </h1>

           {error && (
             <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm p-2 rounded-lg mb-4">
               {error}
             </div>
           )}

           <label className="block text-sm font-medium text-text-muted mb-1">
             Email
           </label>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             className="w-full bg-bg border border-border rounded-lg px-3 py-2 mb-4 text-text focus:outline-none focus:ring-2 focus:ring-accent"
           />

           <label className="block text-sm font-medium text-text-muted mb-1">
             Password
           </label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             className="w-full bg-bg border border-border rounded-lg px-3 py-2 mb-6 text-text focus:outline-none focus:ring-2 focus:ring-accent"
           />

           <button
             type="submit"
             disabled={loading}
             className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
           >
             {loading ? 'Logging in...' : 'Log In'}
           </button>
         </form>
       </div>
     )
   }

   export default Login

