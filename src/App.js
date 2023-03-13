import "./index.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase";
import ResetPwd from "./Components/ResetPwd";

export const ContextValue = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [Auth]);

  const themeController = () => {
    setTheme(!theme);
  };

  return (
    <div className={theme ? "dark" : "light"}>
      <ContextValue.Provider value={{ currentUser, theme }}>
        <BrowserRouter>
          <NavBar themeController={themeController} />
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resetPwd" element={<ResetPwd />} />
          </Routes>
        </BrowserRouter>
      </ContextValue.Provider>
    </div>
  );
}

export default App;
