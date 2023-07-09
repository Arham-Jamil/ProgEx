import React from "react"
import { createContext, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const[auth,setAuth] = useState({'token': false});

    const login = () =>{
        setAuth({'token': true});
    }

    return(
        <AuthContext.Provider value={{auth, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}