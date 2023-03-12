import { useCallback, useEffect, useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);
  const [initialState, setInitialState] = useState({
    name: "",
    email: "",
    password: "",
  });

  // reduce the number of re-renders
  const onChangeHandler = useCallback(
    (e) => {
      setInitialState({
        ...initialState,
        [e.target.name]: e.target.value,
      });

      console.log(initialState);
    },
    [initialState]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(initialState);
  };

  return (
    <div className="container">
      <div className="flex justify-start flex-col">
        <h2 className="text-4xl text-button">Login</h2>
        <h2 className="text-xl">Please sign in to continue.</h2>
      </div>
      <form className="formStyle">
        <label htmlFor="name">User Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="inputStyle"
          onChange={onChangeHandler}
        />
        <label htmlFor="email">
          Email <span className="alert">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="inputStyle"
          onChange={onChangeHandler}
        />
        <label htmlFor="password">
          Password <span className="alert">*</span>
        </label>
        <div className="relative">
          <input
            type={status ? "text" : "password"}
            id="password"
            name="password"
            className="inputStyle"
            required
            onChange={onChangeHandler}
          />
          <span className="iconWrapper" onClick={() => setStatus(!status)}>
            {status ? <IoEyeOutline /> : <RxEyeClosed />}
          </span>
        </div>
        <button className="btn" onClick={onSubmit} disabled={error}>
          Sign In
        </button>
      </form>
      <b className="text-md">
        Don't have an account? <span className="text-button uppercase"><Link to={'/signUp'}>SignUp</Link></span>{" "}
      </b>
    </div>
  );
};
export default SignIn;
