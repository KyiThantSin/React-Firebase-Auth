import "./index.css"
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";

function App() {
  return (
   <div>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
