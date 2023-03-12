import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { Auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ResetPwd = () => {
  const [email, setEmail] = useState(null);
  const resetHandler = (e) => {
    e.preventDefault();
    if (email) {
      sendPasswordResetEmail(Auth, email)
        .then(
          toast("🦄 Successfully sent Password Reset Email!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        )
        .catch((e) => {
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
          console.log("resendEmailPwd:", e);
        });
    }
  };
  return (
    <div className="gap-3 container">
      <h3 className="text-2xl">Forgot your Password ? </h3>
      <p>Enter your email address to retrieve your password.</p>
      <form onSubmit={resetHandler}>
        <input
          type="email"
          required
          name="email"
          className="inputStyle"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="resetBtn" type="submit">
          Reset Password
        </button>
      </form>
      <Link to={"/"}>
        <b className="text-md">Back to SignIn</b>
      </Link>
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
export default ResetPwd;
