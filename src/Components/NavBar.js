import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextValue } from "../App";

const NavLink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(Auth)
      .then(() => {
        toast("🦄 Successfully logged out!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      })
      .catch((e) => {
        console.log("signOut:", e);
      });
  };
  if (location.pathname === "/signUp") {
    return <Link to={"/"}>Sign In</Link>;
  } else if (location.pathname === "/profile") {
    return <button onClick={logOut}>Log Out</button>;
  } else {
    return <Link to={"/signUp"}>Sign Up</Link>;
  }
};

const NavBar = ({ themeController }) => {
  const { currentUser, theme } = useContext(ContextValue);
  return (
    <>
      <div className="navbar-container">
        <div>Logo</div>
        <div className="navbar-inner">
          {theme ? (
            <BsSun size={30} onClick={themeController} />
          ) : (
            <MdOutlineDarkMode size={30} onClick={themeController} />
          )}
          <div>
            <button className="navbar-button">
              <NavLink />
            </button>
          </div>
        </div>
      </div>
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
    </>
  );
};
export default NavBar;
