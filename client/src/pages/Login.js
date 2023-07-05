import { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";

//logic to authenticate the credentials
const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[loggedIn, setLoggedIn] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault();
        //zu ergänzen mit databank staff credentials
        //if the credentials are correct, navigate to contact page
        setLoggedIn(true);
        console.log('loggen in')
    }

    if(loggedIn){
        return <Navigate to="/src/StaffView/OrdersPage.js"/>
    }


    return(
        <Fragment>
            <form>
                <label for="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@domain.com"></input>
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