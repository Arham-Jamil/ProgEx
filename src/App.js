import { useState } from "react";
import "./App.css";
import Login from "./Login/Login";
import HomePage from "./pages/HomePage";

const App = () =>{
  // this to go to the login 
  // const toggleLogin = () =>{
  //   setLoginIsShown(true)
  // }
  // if(loginIsShown){
  //   return <Login/>
  // }

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
