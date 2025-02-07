
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Register from "./pages/Register"
import  SignIn  from './pages/Signin'
import  Home  from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Transactions from "./pages/Transactions"
import Requests from "./pages/Requests"


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
