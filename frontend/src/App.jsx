import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Medicines from "./pages/Medicines";
import Supplies from "./pages/Supplies";
import Alerts from "./pages/Alerts";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/supplies" element={<Supplies />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
