import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import Login from "./pages/Login";

const App = () =>{
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/Homepage" element={<HomePage/>}/>
          <Route path="/src/pages/HomePage.js" element={<HomePage/>}/>
          <Route path="/src/pages/Login.js" element={<Login/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
