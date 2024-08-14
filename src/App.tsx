import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
import History from "./pages/complaint-history"

function App() {
  return (
   <main>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
   </main>
  )
}

export default App