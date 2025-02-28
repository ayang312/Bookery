import { useDispatch } from "react-redux";

const Admin = () => {
const dispatch = useDispatch();

const handleLogout = async () => {
  try {
    // Dispatch logout action from authSlice

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
