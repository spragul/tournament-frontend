import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { URL } from '../../backend link';
import { toast } from "react-toastify";

function Edittournament() {
    const [gamename, setGamename] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [inchargename, setInchargename] = useState('');
    const [mobile, setMobile] = useState('');
    const [startingdate, setStartingdate] = useState('');
    const [endingdate, setEndingdate] = useState('');
    const history=useHistory();
    const {id}=useParams();
    const token=sessionStorage.getItem('token')
    //Add a data
    async function updatedata(tournamentobject) {
        let response = await axios.put(`${URL}/tournament/update/${id}`, tournamentobject,{ headers: {"Authorization" : `Bearer ${token}`}});
        toast(response.data.message);
        console.log(response)
        if(response.data.rd===true){
            history.push('/dashboard');
        }
    }
    //geting data
    async function getdata() {
        try {
            const response = await axios.get(`${URL}/tournament/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}});
            console.log(response.data.Data);
            let data=response.data.Data;
            let sdate1=data.startingdate.split('T');
            let sdate2=data.endingdate.split('T')
           
            if(data){
                setGamename(data.gamename);
                setDescription(data.description);
                setImage(data.image);
                setInchargename(data.inchargename);
                setMobile(data.mobile);
                setStartingdate(sdate1[0]);
                setEndingdate(sdate2[0]);
            }
        } catch (error) {
            console.error(error);
            toast.error(`Error${error}`);
        }
    }
    useEffect(() => {
        getdata();
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();
        const tournamentobject = { gamename, description, image, inchargename, mobile, startingdate, endingdate };
        console.log(tournamentobject);
        updatedata(tournamentobject)
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Edit Tournament</h2>
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
                        <Link className="btn btn-danger" to={'/dashboard'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Edittournament