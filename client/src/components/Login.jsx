import { useState } from "react";
import { useLoginUserMutation } from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Tracks the form inputs
  const [formData, setFormData] = useState({
    identifier: "", // email/username
    password: "",
  });
  // RTK Query for calling /api/auth/login
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  // useDispatch to call apiSlice actions
  const dispatch = useDispatch();
  // Navigate to other page
  const navigate = useNavigate();

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
    // upon submitting form, dispatch loginStart
    dispatch(loginStart());

    // API Call
    try {
      const user = await loginUser({
        ...formData,
        baseUrl: "http://localhost:3000",
      }).unwrap();
      console.log(user);

      if (user.user) {
        //   Handle successful login
        dispatch(loginSuccess({ user: user.user }));

        // Navigate to Admin Dashboard
        navigate("/admin");
        console.log("Login successful", user);
        alert("Login successful");
      }
    } catch (error) {
      dispatch(loginFailure(error.message || "Failed to login"));
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          {isError && (
            <p>
              {error?.data?.message ||
                error?.message ||
                "An error occurred. Please try again."}
            </p>
          )}

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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
