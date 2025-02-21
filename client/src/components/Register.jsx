import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // Handle the API logic
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong fetching API");
      }

      //   Handle successful Registration
      console.log("Registration successful", data);

      //   Redirect to confirmation page
      navigate("/confirmationPage");
      //   Success message
      alert("Registration successful");
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
