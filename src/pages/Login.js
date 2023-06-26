import { Fragment, useState } from "react";
import KitchenOrders from "../KitchenMenu/KitchenOrders";
import { Link } from "react-router-dom";


const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[KitchenOrderShown, setKitchenOrderShown]=useState(false)

    const handleSubmit = (e) =>{
        //zu ergänzen mit databank staff credentials
        e.preventDefault();
        setKitchenOrderShown(true)
        console.log('loggen in')
    }

  

    //modify this 
    if(KitchenOrderShown){
        return <KitchenOrders />
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