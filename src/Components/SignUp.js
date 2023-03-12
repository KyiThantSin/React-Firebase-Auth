import { useCallback, useEffect, useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { Auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);
  const [statusPw, setStatusPw] = useState(false);
  const [initialState, setInitialState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
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

  useEffect(() => {
   if (initialState.confirmPassword || initialState.password) {
      if(initialState?.confirmPassword.length < 6 || initialState?.password.length < 6){
       setError("Password must be at least 6 characters long")
      }else if(initialState.password !== initialState.confirmPassword){
        setError("Password does not match!");
      }
      else{
        setError(null)
      }
    } 
    
  }, [initialState.confirmPassword,initialState.password]);

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(initialState);
    if(initialState){
      createUserWithEmailAndPassword(Auth, initialState.email, initialState.password)
        .then((userCredential) => {
        console.log(userCredential)
  })
  .catch((error) => {
    console.log(error)
  });
    }
  };

  return (
    <div className="container">
      <h2 className="text-4xl">Create Account</h2>
      <form className="formStyle">
        <label htmlFor="name">
          User Name <span className="alert">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
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
          <span className="iconWrapper" onClick={()=>setStatus(!status)}>
            {status ? <IoEyeOutline /> : <RxEyeClosed />}
          </span>
        </div>
        <label htmlFor="confirmPassword">
          Confirm Password <span className="alert">*</span>
        </label>
        <div className="relative">
          <input
            type={statusPw ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="inputStyle"
            required
            onChange={onChangeHandler}
          />
          <span className="iconWrapper" onClick={()=>setStatusPw(!statusPw)}>
            {statusPw ? <IoEyeOutline /> : <RxEyeClosed />}
          </span>
        </div>
        {error && <b className="alert">{error}</b>}
        <button className="btn" onClick={onSubmit} disabled={error}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
