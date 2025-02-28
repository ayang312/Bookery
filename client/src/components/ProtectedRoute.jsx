import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children, requiredRole}) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home
  }

  return children; //Render the protected component
};

export default ProtectedRoute;
