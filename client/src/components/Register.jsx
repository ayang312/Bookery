const Register = () => {
  // Handle form data to be sent to backend
  // Handle errors
  // Handle loading
  // Form validations (later)
  // Handle the input changes
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
            <input type="text" name="username" id="username" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password"></label>
            <input type="password" />
          </div>

          {/* Submit */}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
