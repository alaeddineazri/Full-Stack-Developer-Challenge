
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./App.css" 
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
