import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Step1Profile from "./pages/practitioner/Step1Profile";
import Step2Documents from "./pages/practitioner/Step2Documents";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<ComingSoon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/practitioner/step1"
          element={
            <ProtectedRoute>
              <Step1Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practitioner/step2/:id"
          element={
            <ProtectedRoute>
              <Step2Documents />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
