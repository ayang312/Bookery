import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

const Assistant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // dispatch logout action from authSlice
      dispatch(logout());
      //   Redirect back to Home
      navigate("/");
      // Success message
      alert("Successfully logged out!");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  return (
    <>
      <h1>Assistant Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Assistant;
