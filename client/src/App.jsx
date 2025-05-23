import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmationPage from "./Pages/ConfirmationPage";
import Admin from "./pages/AdminDashboard";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* Admin/Assistant Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                {/* Admin page is a child of the ProtectedRoute component */}
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <ProtectedRoute requiredRole="ASSISTANT">
                {/* Assistant page is child of ProtectedRoute */}
                <Assistant />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
