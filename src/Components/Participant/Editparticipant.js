import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { URL } from '../../backend link';
import { toast } from 'react-toastify';

function Editparticipant() {
    const [ttournament, setTtournamentdata] = useState('');
    const [tournament, setTournament] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setimage] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setdob] = useState('');
    const { id } = useParams();
    const history = useHistory();
    const token=sessionStorage.getItem('token');
    //get selected data
    async function getdata() {
        try {
            const response = await axios.get(`${URL}/participant/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}});
            console.log(response.data.personData);
            let data = response.data.personData;
            let sdate1 = data.dob.split('T');
            if (data) {
                setName(data.name);
                setEmail(data.email);
                setimage(data.image);
                setMobile(data.mobile);
                setdob(sdate1[0]);
                setTournament(data.tournament);
            }

        } catch (error) {
            console.error(error);
        }
    }
    async function tgetdata() {
        try {
            const response = await axios.get(`${URL}/tournament`,{ headers: {"Authorization" : `Bearer ${token}`}});
            console.log(response.data.Data);
            setTtournamentdata(response.data.Data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getdata();
        tgetdata();
    }, []);


    async function edditpart(participantobj) {
        let response = await axios.put(`${URL}/participant/update/${id}`, participantobj,{ headers: {"Authorization" : `Bearer ${token}`}});
        toast(response.data.message);
        if (response.data.rd === true) {
            history.push('/participant')
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const participantobj = { name, email, image, mobile, dob, tournament };
        console.log(participantobj);
        edditpart(participantobj)
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Edit Participant</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type='text' value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} type='email' onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>image</label>
                                    <input type='text' value={image} onChange={e => setimage(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>mobile</label>
                                    <input type='number' value={mobile} onChange={e => setMobile(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>dob</label>
                                    <input type='Date' value={dob} onChange={e => setdob(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            {ttournament.length !== 0 ? <div className="col-lg-12">
                                <div className="form-group">
                                    <select value={tournament} className='dropdown-select' onChange={(e) => setTournament(e.target.value)}>
                                        <option>Select tournament</option>
                                        {ttournament.map((list, index) => (
                                            <option key={index}>{list.gamename}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> : <div></div>}

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/participant'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Editparticipant