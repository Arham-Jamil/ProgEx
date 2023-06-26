import { Fragment, useState } from "react";
import App from "../App"
import KitchenOrders from "../KitchenMenu/KitchenOrders";


const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[HomepageIsShown, setHomepageIsShown]=useState(false)
    const[KitchenOrderShown, setKitchenOrderShown]=useState(false)

    const handleSubmit = (e) =>{
        //zu ergänzen mit databank staff credentials
        e.preventDefault();
        setKitchenOrderShown(true)
        console.log('loggen in')
    }

    //this is used to return to the homepage (Appjs)
    const toggleHomepage = () =>{
        setHomepageIsShown(true)
    }

    if(HomepageIsShown){
        return <App />
    }

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
            <button onClick={toggleHomepage}>back</button>
        </Fragment>
    )
}

export default Login;