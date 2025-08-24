// src/App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Trash from "./pages/Trash";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trash",
    element: (
      <ProtectedRoute>
        <Trash />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[rgb(128,0,128)] text-white">
            <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}
