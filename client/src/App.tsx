import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterAuth from "./pages/auth/RegisterAuth";
import LoginAuth from "./pages/auth/LoginAuth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/register" element={<RegisterAuth />} />
      <Route path="/login" element={<LoginAuth />} />
      <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
