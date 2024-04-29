import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const newErrors = {};
    if (email.length <= 0) newErrors.email = "Email is required";
    if (username.length <= 0) newErrors.username = "Username is required";
    if (username.length < 4 && username / length > 0)
      newErrors.username = "Username must be longer than 4 characters";
    if (firstName.length <= 0) newErrors.firstName = "First name is required";

    if (lastName.length <= 0) newErrors.lastName = "Last name is required";
    if (password.length <= 0) newErrors.password = "Password is required";
    if (password.length < 6 && password.length > 0)
      newErrors.password = "Password must be longer than 6 charcters";
    if (password !== confirmPassword)
      newErrors.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    if (Object.keys(newErrors).length > 0) {
      setErrors({ true: true });
    } else {
      setErrors({});
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
            console.log("ERRORS FROM BACKEND", data.errors, "errors", errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="form-errors">{errors.email}</p>}
        </label>

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className="form-errors">{errors.username}</p>}
        </label>

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <p className="form-errors">{errors.firstName}</p>
          )}
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p className="form-errors">{errors.lastName}</p>}
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="form-errors">{errors.password}</p>}
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="form-errors">{errors.confirmPassword}</p>
          )}
        </label>

        <button
          className="sign-up-button"
          type="submit"
          disabled={Object.keys(errors).length > 0 ? true : false}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
