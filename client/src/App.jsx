import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmationPage from "./components/ConfirmationPage";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
