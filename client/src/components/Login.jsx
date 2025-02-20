const Login = () => {
  const handleSubmit = () => {};

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username/Email</label>
          <input
            type="text"
            name="username"
            id="username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
          />
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default Login;
