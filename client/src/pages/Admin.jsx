import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Admin = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // Dispatch logout action from authSlice
    dispatch(logout());
    // Redirect back to homepage
    navigate("/");
    // Show alert message
    alert("Successfully logged out!");
  } catch (error) {
    console.error("Failed to logout", error);
    
  }
}

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Admin;
