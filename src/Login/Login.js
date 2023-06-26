import { useState } from "react";
import App from "../App"


const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[HomepageIsShown, setHomepageIsShown]=useState(false)

    const handleSubmit = (e) =>{
        //zu ergänzen
        e.preventDefault();
        console.log('loggen in')
    }

    const toggleHomepage = () =>{
        setHomepageIsShown(true)
    }

    if(HomepageIsShown){
        return <App />
    }
// login page should be added to app.js in such a way that is shown only when loginbtn is clicked

    return(
        <>
        <form>
            <label for="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@domain.com"></input>
            <label for="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********"></input>
            <button type="submit" onClick={handleSubmit}>Log in</button>
        </form>
        <p>Just for staff members</p>
        <button onClick={toggleHomepage}>back</button>
        </>
    )
}

export default Login;