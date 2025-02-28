import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <h1>
        Confirmation page upon successfully booking or successfully registering
        user
      </h1>

      <button onClick={handleClick}>Back to Home</button>
    </>
  );
};

export default ConfirmationPage;
