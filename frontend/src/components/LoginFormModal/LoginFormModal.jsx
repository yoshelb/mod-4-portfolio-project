import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        console.log("Default user login successful, closing modal");
        closeModal();
      })
      .then(() => navigate("/"))
      .catch(async (res) => {
        console.log("Default user login failed, handling errors");
        const data = await res.json();
        if (data && data.errors) {
          console.log("Errors found:", data.errors);
          setErrors(data.errors);
        }
      });
  };

  const handleDefaultUser = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({
        credential: "sixlegs@user.io",
        password: "password4",
      })
    )
      .then(closeModal)
      .then(() => navigate("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="form-errors">{errors.credential}</p>
        )}

        <button
          disabled={credential.length < 4 || password.length < 6 ? true : false}
          type="submit"
        >
          Log In
        </button>
      </form>
      <button
        className="default-user-button"
        onClick={(e) => handleDefaultUser(e)}
      >
        Log in as Demo User
      </button>
    </>
  );
}

export default LoginFormModal;
