import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlantManager from "./pages/PlantManager";
import Login from "./pages/Login";

function PrivateRouting({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/plantManager" replace />}
        />

        <Route
          path="/plantManager"
          element={
            <PrivateRouting>
              <PlantManager />
            </PrivateRouting>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
