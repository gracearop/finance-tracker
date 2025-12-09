import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import './App.css';
import AppNavbar from './components/NavBar';
import Footer from './components/Footer';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ResetRequest from "./pages/ResetRequest";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this line


import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// 🔒 Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
      <AppNavbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-request" element={<ResetRequest />} />
          <Route path="/reset" element={<ResetPassword />} />

        </Routes>
      </div>
      <Footer />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;