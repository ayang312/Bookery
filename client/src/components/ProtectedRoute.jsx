import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  //   If the user is not authenticated or not admin, navigate to Unauthorized page
  if (!isAuthenticated || user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Redirect to home
  }

  return children; //Render the protected component
};

export default ProtectedRoute;
