import axios from 'axios';
import React,{createContext, useEffect ,useState} from 'react'

const AuthContext = createContext();

function AuthContexProvider(props) {
    
    const [loggedIn , setLoggedIn] = useState("undefined");
    const [userId, setUserId] = useState("")
    

    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:5000/users/loggedIn");
        const userIdRes = await axios.get("http://localhost:5000/users/userId");
        setUserId(userIdRes.data);
        setLoggedIn(loggedInRes.data);

    }
    useEffect(()=>{
        getLoggedIn();
    },[]);
    
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn,userId}}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContexProvider};
