import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize local state for the form
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "ASSISTANT",
  });

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
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      {/* User Management */}
      <section>
        <h2>User Management</h2>
        <div>
          <h3>Create New User</h3>
          {/* Username Form Input */}
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          {/* Email Form input */}
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="ASSISTANT">Assistant</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button onClick={handleCreateUser}>Create User</button>
        </div>

        <h3>All Users</h3>
        <ul>{/* Map the Users here */}</ul>
      </section>

      {/* Time Slot Management */}
      <section>
        <h2>Time Slot Management</h2>
        <div>
          <h3>Create New Time Slot</h3>
          {/* Inputs to create time slots */}
        </div>

        <h3>All Time Slots</h3>
        <ul>{/* Map all the time slots here */}</ul>
      </section>

      {/* Button to Logout */}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Admin;
