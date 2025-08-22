import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="glass-card px-6 py-4 text-white">Checking session…</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
