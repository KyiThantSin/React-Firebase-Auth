import { useCallback, useEffect, useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
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
      //console.log(initialState);
    },
    [initialState]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(initialState);
    if (initialState.email && initialState.password) {
      signInWithEmailAndPassword(
        Auth,
        initialState.email,
        initialState.password
      )
        .then((userCredential) => {
          //console.log(userCredential)
          toast("🦄 Login Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/profile");
        })
        .catch((e) => {
          console.log("sign-In:", e);
          if (e.code === "auth/user-not-found") {
            toast("This email is not registered", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast("Oops..something wrong :( ", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
  };
  return (
    <div className="container">
      <div className="flex justify-start flex-col">
        <h2 className="text-4xl text-button">Login</h2>
        <h2 className="text-xl">Please sign in to continue.</h2>
      </div>
      <form className="formStyle" onSubmit={onSubmit}>
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
            {status ? (
              <IoEyeOutline color="#000000" />
            ) : (
              <RxEyeClosed color="#000000" />
            )}
          </span>
        </div>
        <b
          className="text-sm flex justify-end"
          onClick={() => navigate("/resetPwd")}>
          Forgot password?
        </b>
        <button className="btn" type="submit" disabled={error}>
          Sign In
        </button>
      </form>
      <b className="text-md">
        Don't have an account?{" "}
        <span className="text-button uppercase">
          <Link to={"/signUp"}>SignUp</Link>
        </span>{" "}
      </b>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </div>
  );
};
export default SignIn;
