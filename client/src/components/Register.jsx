import { useState } from "react";

const Register = () => {
  // Handle form data to be sent to backend
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle errors
  // Handle loading
  // Form validations... username, email, password (later)
  // Handle the input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Handle the form submission
  // Handle the API logic
  // return a form with inputs
  return (
    <>
      <div>
        <form>
          <h2>Register</h2>

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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
