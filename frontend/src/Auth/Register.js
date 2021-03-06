import axios from 'axios'
import React, { useContext,useState } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

function Register() {
    const[email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordverify] = useState("");
    const [userType , setUserType]=useState("candidate");
    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();

    async function register(e){
        e.preventDefault();
        try{
            const registerData={
                email,
                password,
                passwordVerify,
                userType
            }
            console.log(registerData);
            await axios.post("http://localhost:5000/users/register" ,registerData)
            await getLoggedIn();
            history.push("/");

        }catch(err){
            console.error(err);
        }
    }


    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Register</h5>
                                <form onSubmit={register} className="validated-form" noValidate>
                                    <div className="mb-3">
                                        <label className="form-label" >Email</label>
                                        <input text="email" className="form-control" placeholder="Email" 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            value={email}>
                                        </input>
                                    </div>

                                    <div className="mb-3">
                                    <label className="form-label">Select User Type</label>
                                        <select className="form-control" 
                                                onChange={(e)=>setUserType(e.target.value)}
                                                value={userType}>
                                            <option value="candidate">Candidate</option>
                                            <option value="recruiter">Recruiter</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Password</label>
                                        <input type="password" className="form-control" name="password" required placeholder="Password" 
                                            onChange={(e)=>setPassword(e.target.value)} 
                                            value={password}>
                                        </input>
                                    </div>
                                    
                                    <div className="mb-3">
                                    <label className="form-label">Password Verify</label>
                                        <input type="password" className="form-control" name="passwordVerify" required placeholder="Password" 
                                            onChange={(e)=>setPasswordverify(e.target.value)} 
                                            value={passwordVerify}>
                                        </input>
                                    </div>

                                    
                            
                                    <button type="submit" className="btn btn-success btn-block"> Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
