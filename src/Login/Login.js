import { useState } from "react";


const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        //zu ergänzen
        e.preventDefault();
        console.log('loggen in')
    }


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
        </>
    )
}

export default Login;