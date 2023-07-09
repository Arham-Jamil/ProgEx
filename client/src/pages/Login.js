import { Fragment, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import axios from "axios"

//logic to authenticate the credentials
const Login = (props) =>{

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[loggedIn, setLoggedIn] = useState(false)
    const {login} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //zu ergänzen mit databank staff credentials
        //if the credentials are correct, navigate to contact page
        // try {
        //   const response =  await axios.post('http://localhost:3001/login', { username, password });
        //  console.log('response ', response.data)
        //  if(response.data.success){
        //    login();
        //    setLoggedIn(true);
        //    console.log('loggen in')
        // }else{
        //    console.log('login failed')
        // }
        // } catch (error) {
        //     console.error(error);
        // }
        //// for testing purposes, the above function was blended
        ///in the final version, line 33 and 34 should be deleted and the above function should be made active again   
        login();
        setLoggedIn(true);    
    };

    if(loggedIn){
        return <Navigate to="/Nav"/>
    }


    return(
        <Fragment>
            <form>
                <label for="email">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" placeholder="youremail@domain.com"></input>
                <label for="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********"></input>
                <button type="submit" onClick={handleSubmit}>Log in</button>
            </form>
            <p>Just for staff members</p>
            <Link to="/src/pages/HomePage.js">back</Link>
        </Fragment>
    )
}

export default Login;