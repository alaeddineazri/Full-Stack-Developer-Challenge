
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/DashboardAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardUser from "./components/DashboardUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-user" element={<DashboardUser/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
