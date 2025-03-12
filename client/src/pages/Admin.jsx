import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../redux/admin/userApi";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User Management RTK
  const { data: users = [], refetch: refetchUsers } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  // Initialize local state for the form
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "ASSISTANT",
  });

  // Handle Create User button
  const handleCreateUser = async () => {
    try {
      // API call to backend to create user
      await createUser(newUser).unwrap();
      alert("User created successfully!");
      // reset state
      setNewUser({ username: "", email: "", role: "ASSISTANT" });
      // refetch the data after mutation
      refetchUsers();
    } catch (error) {
      console.error("Failed to create new user", error);
    }
  };

  // Handle Update User Button to promote/demote role
  const handleUpdateUser = async (user) => {
    try {
      // API call to backend to update User
      await updateUser(user).unwrap();
      alert("User updated successfully!");
      refetchUsers();
    } catch (error) {
      console.error("Failed to udpate user", error);
    }
  };

  // Handle Logout button
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
        <ul>
          {/* Map the Users here */}
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.role})
              <button
                onClick={() =>
                  handleUpdateUser({
                    ...user,
                    role: user.role === "ADMIN" ? "ASSISTANT" : "ADMIN",
                  })
                }
              >
                {user.role === "ADMIN" ? "Demote" : "Promote"}
              </button>
            </li>
          ))}
        </ul>
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
