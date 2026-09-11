   import { Routes, Route, Navigate } from 'react-router-dom'
   import Login from './pages/Login'
   import Dashboard from './pages/Dashboard'
   import Branches from './pages/Branches'
   import Employees from './pages/Employees'
   import AskAI from './pages/AskAI'
   import { useAuth } from './context/AuthContext'

   function PrivateRoute({ children }) {
     const { user } = useAuth()

     if (!user) {
       return <Navigate to="/login" replace />
     }

     return children
   }

   function App() {
     return (
       <Routes>
         <Route path="/login" element={<Login />} />

         <Route
           path="/"
           element={
             <PrivateRoute>
               <Dashboard />
             </PrivateRoute>
           }
         />

         <Route
           path="/branches"
           element={
             <PrivateRoute>
               <Branches />
             </PrivateRoute>
           }
         />

         <Route
           path="/employees"
           element={
             <PrivateRoute>
               <Employees />
             </PrivateRoute>
           }
         />

         <Route
           path="/ask-ai"
           element={
             <PrivateRoute>
               <AskAI />
             </PrivateRoute>
           }
         />
       </Routes>
     )
   }

   export default App