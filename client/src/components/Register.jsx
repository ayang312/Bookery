import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/auth/authApi";
import { registerStart } from "../redux/auth/authSlice";

const Register = () => {
  // Handle form data to be sent to backend
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Handle errors
  const [errors, setErrors] = useState("");
  // Handle loading
  const [loading, setLoading] = useState(false);
  // Navigate to other page
  const navigate = useNavigate();
  //   Integrate RTK Query to make call to api/auth/register
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  // Form validations... username, email, password (later)

  // Handle the input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // dispatch registerStart upon submitting form
    dispatch(registerStart());

    // Handle the API logic
    try {
      const newUser = await registerUser({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: "ASSISTANT",
      }).unwrap();

      //   Handle successful Registration
      if (newUser.user) {
        //   Redirect to confirmation page
        navigate("/confirmation");

        console.log("Registration successful", data);
        //   Success message
        alert("Registration successful");
      }
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  // return a form with inputs
  return (
    <>
      <div>
        <form onSubmit={handleRegister}>
          <h2>Register</h2>

          {/* Error Handling */}
          {errors && <p>{errors}</p>}

          {/* Username */}
          <div>
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter a new unique username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter a new unique email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a new password"
            />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting Registration Form..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
