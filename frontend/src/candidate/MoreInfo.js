import axios from 'axios'
import React, { useContext ,useState} from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

function MoreInfo() {

    const [collage, setCollage] = useState("");
    const [year, setYear] = useState(0);
    const [phoneNo, setPhoneNo] = useState(0);
    const {getLoggedIn}= useContext(AuthContext);
    const {userId}=useContext(AuthContext);
    const history =useHistory();

    async function moreInfo(e){
        e.preventDefault();
        try{
            const infoData={
                collage,
                year,
                phoneNo
            }
            console.log(infoData);
            await axios.post("http://localhost:5000/candidates/"+userId+"/moreInfo" ,infoData)
            console.log(userId);
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
                                <h5 className="card-title">Login</h5>
                                <form onSubmit={moreInfo} className="validated-form" noValidate>

                                    <div className="mb-3">
                                        <label className="form-label" >Collage Name</label>
                                        <input type="text" className="form-control" placeholder="collage name" 
                                            onChange={(e) => setCollage(e.target.value)} 
                                            value={collage}>
                                        </input>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Year</label>
                                        <input type="number" className="form-control" placeholder="Year" 
                                            onChange={(e) => setYear(e.target.value)} 
                                            value={year}>
                                        </input>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Phone Number</label>
                                        <input type="number" className="form-control" placeholder="Phone Number" 
                                            onChange={(e) => setPhoneNo(e.target.value)} 
                                            value={phoneNo}>
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

export default MoreInfo
