import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import VerifyEmail from "./pages/VerifyEmail";
import { loadUserFromStorage } from "./redux/slices/authSlice";
// import ResetPassword from "./pages/ResetPassword";
// import ForgotPassword from "./pages/Forgot-password";

// Layout
const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Public route
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" />;
  }

  return children; // nahi to login/register render ho
};

// Protected Route
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // Wait until loading finishes and user is fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Role-based access check
  if (role === "admin" && !user?.isAdmin) return <Navigate to="/" />;

  return children;
};

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      // {
      //   path: "/forgot-password",
      //   element: (
      //     <PublicRoute>
      //       <ForgotPassword />
      //     </PublicRoute>
      //   ),
      // },
      // {
      //   path: "/reset-password/:token",
      //   element: (
      //     <PublicRoute>
      //       <ResetPassword />
      //     </PublicRoute>
      //   ),
      // },

      {
        path: "/verify-email",
        element: (
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider
        key={isAuthenticated ? "auth" : "guest"}
        router={router}
      />
    </>
  );
}
