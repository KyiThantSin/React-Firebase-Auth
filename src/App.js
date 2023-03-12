import "./index.css"
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
