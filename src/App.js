import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Reports from "./pages/Reports";
import Home from "./pages/Home";
import './App.css';
 import AppNavbar from './components/NavBar';
 import Footer from './components/Footer';
 import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <>
      <AppNavbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default App;