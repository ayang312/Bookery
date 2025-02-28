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
  const [formInput, setFormInput] = useState({
    identifier: "", // Email/username
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
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  //   Handle Form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    // upon submitting form, dispatch loginStart
    dispatch(loginStart());

    // console.log(formData);

    // Regex to check if input is an email, if false it is treated as a username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.identifier);

    const formData = isEmail
      ? { email: formInput.identifier, password: formInput.password }
      : { username: formInput.identifier, password: formInput.password };

    console.log("Login Data:", formData);

    // API Call
    try {
      const user = await loginUser(formData).unwrap();
      // console.log(user);

      if (user.user) {
        //   Handle successful login
        dispatch(loginSuccess({ user: user.user }));

        // If assistant logs in, redirect to Assistant Dashboard
        if (user?.user.role !== "admin") {
          navigate("/assistant");
          console.log("Login successful", user);
          alert("Welcome Assistant!");
        } else {
          // If Admin logs in, navigate to Admin Dashboard
          navigate("/admin");
          console.log("Login successful", user);
          alert("Welcome Admin");
        }
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
              value={formInput.identifier}
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
              value={formInput.password}
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
