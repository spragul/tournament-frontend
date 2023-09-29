import React, { useEffect, useState } from 'react'
import { URL } from '../../backend link';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { toast } from "react-toastify";

function Addwinner() {
    const [tournament, setTournamentdata] = useState('');
    const [name, setName] = useState('');
    const [prize, setPrize] = useState('');
    const { id } = useParams();
    const history=useHistory();
    const token=sessionStorage.getItem('token');
    //geting data
    async function getdata() {
        try {
            const response = await axios.get(`${URL}/tournament/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}});
            console.log(response.data.Data);
            setTournamentdata(response.data.Data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getdata();
    }, []);

    async function addwinner(winnerobject){
        let response = await axios.patch(`${URL}/tournament/winner/${id}`,winnerobject);
        toast(response.data.message);
        if(response.data.rd===true){
          history.push('/dashboard')
        }
      }
    const handlesubmit = (e) => {
        e.preventDefault();
        const winnerobject = { name, prize };
        console.log(winnerobject);
        if(winnerobject.name===''){
            toast("select option again")
        }else{
            addwinner(winnerobject)
        }
    }
    function handleSelect(e){
        console.log(e)
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add Winner</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row drop-containar">
                            <div className="col-lg-12">
                                <div >
                                    <select value={prize} onChange={e => setPrize(e.target.value)}className='dropdown-select' >
                                    <option>Select prize</option>
                                        <option>First prize</option>
                                        <option>Second prize</option>
                                        <option>Third prize</option>
                                    </select>
                                </div>
                            </div>


                            {tournament.length !== 0 ? <div className="col-lg-12">
                                <div className="form-group">
                                    <select value={name} className='dropdown-select' onChange={(e) => setName(e.target.value)}>
                                        <option>Select Name</option>
                                        {tournament.participant.map((list,index) => (
                                            <option key={index}>{list}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> : <div>Loading</div>}

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

export default Addwinner
