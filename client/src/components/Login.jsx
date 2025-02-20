import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   Handle Form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // API Call
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
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

    //   Handle successful login
    console.log("Login successful", data);
    alert("Login successful");
    
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
          <label htmlFor="username">Username/Email</label>
          <input type="text" name="username" id="username" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
