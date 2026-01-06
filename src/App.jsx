import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./pages/Loader";

// Lazy loaded pages
const Login = lazy(() => import("./pages/Login"));
const Otp = lazy(() => import("./pages/Otp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
