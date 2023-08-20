import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { URL } from '../../backend link';
import Loading from '../Loading';
import Navbartop from '../NavBar.js/navbar';


function TournamentList() {
    const [tournamentdata, setTournamentdata] = useState([]);
    const history = useHistory();

    //geting data
    async function getdata() {
        try {
            const response = await axios.get(`${URL}/tournament`);
            console.log(response.data.Data);
            setTournamentdata(response.data.Data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getdata();
    }, [])
    //delete data
    async function deletedata(id) {
        try {
            let response = await axios.delete(`${URL}/tournament/delete/${id}`);
            console.log(response.data.message)
            toast(response.data.message);
            if (response.data.rd === true) {
                getdata();
            }
        } catch (error) {
            console.log(error);
            toast(error)
        }
    }
    return (
        <Navbartop>
            <div>
                {tournamentdata.length === 0 ? <Loading></Loading> :
                    <div className='card top-container'>
                        <div className="card-header">
                            <Link to="/add/tournament" className="btn btn-success">Add New (+)</Link>
                        </div>
                        <div class="order-container">
                            <div class="my-card-container">
                                {tournamentdata.map((list, index) => (
                                    <div className="my-card" >
                                            <div className="my-card-header">
                                                <div className="my-card-image">
                                                    <img src={list.image}></img>
                                                </div>
                                            </div>
                                            <div className="my-card-body">
                                                <h3>{list.gamename}</h3>
                                                <p><span className='my_span'>Incharge Name: </span>{list.inchargename}</p>
                                                <p><span className='my_span'>Mobile:</span>{list.mobile}</p>
                                                <p><span className='my_span'>Starting Date:</span>{list.startingdate.slice(0, 10)}</p>
                                                <p><span className='my_span'>Ending Date:</span>{list.endingdate.slice(0, 10)}</p>
                                                <div className='delete-button'>
                                                    <Button onClick={() => { history.push(`/detail/${list._id}`) }} variant="primary" >details</Button>
                                                    <Button onClick={() => deletedata(list._id)} variant="danger" ><span className='delete-btn'><MdDelete /></span></Button>
                                                    <Button onClick={() => { history.push(`/edit/tournament/${list._id}`) }} variant="warning" ><span className='edit-btn'><FaEdit /></span></Button>
                                                </div>
                                            </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div >
                }
            </div>
        </Navbartop>
    );
}

export default TournamentList;
