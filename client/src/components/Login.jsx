import { useState } from "react";
import { useLoginUserMutation } from "../redux/auth/authApi";

const Login = () => {
  // Tracks the form inputs
  const [formData, setFormData] = useState({
    identifier: "", // email/username
    password: "",
  });
  //   Handle any errors
  const [error, setError] = useState("");
  //   isLoading
  const [loading, setLoading] = useState(false);
  // RTK Query for calling /api/auth/login
  const [loginUser] = useLoginUserMutation();

  // Handle input changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   Handle Form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // API Call
    try {
      const user = await loginUser(formData).unwrap();

      if (user.user) {
        //   Handle successful login
        console.log("Login successful");
        alert("Login successful");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p>{error}</p>}

          <div>
            {/* Email or Username Input */}
            <label htmlFor="identifier">Username or Email</label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              placeholder="Please enter email or username"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
