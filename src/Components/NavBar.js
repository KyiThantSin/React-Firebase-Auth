import { MdOutlineDarkMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  //console.log(location.pathname);
  return (
    <div className="navbar-container">
      <div>Logo</div>
      <div className="navbar-inner">
        <MdOutlineDarkMode size={30} />
        <div>
          <button className="navbar-button">
            {location?.pathname === "/signUp" ? (
              <Link to={"/"}>Sign In</Link>
            ) : (
              <Link to={"/signUp"}>Sign Up</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
