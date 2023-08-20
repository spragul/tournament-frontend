import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { URL } from '../../backend link';
import { toast } from "react-toastify";


function Addtournament() {
    const [gamename, setGamename] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [inchargename, setInchargename] = useState('');
    const [mobile, setMobile] = useState('');
    const [startingdate, setStartingdate] = useState('');
    const [endingdate, setEndingdate] = useState('');
    const history=useHistory();
    //Add a data
    async function adddata(tournamentobject) {
        let response = await axios.post(`${URL}/tournament/adddata`, tournamentobject);
        toast(response.data.message);
        if(response.data.rd===true){
            history.push('/');
        }
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        const tournamentobject = { gamename, description, image, inchargename, mobile, startingdate, endingdate };
        console.log(tournamentobject);
        adddata(tournamentobject)
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add Tournament</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Game Name</label>
                                    <input type='text' value={gamename} onChange={e => setGamename(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input value={description} type='description' onChange={e => setDescription(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type='text' value={image} onChange={e => setImage(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Incharge Name</label>
                                    <input type='text' value={inchargename} onChange={e => setInchargename(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input type='number' value={mobile} onChange={e => setMobile(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Starting Date</label>
                                    <input type='Date' value={startingdate} onChange={e => setStartingdate(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Ending Date</label>
                                    <input type='Date' value={endingdate} onChange={e => setEndingdate(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Addtournament





