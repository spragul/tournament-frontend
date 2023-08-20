import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { URL } from '../../backend link';
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Loading from '../Loading';
import Navbartop from '../NavBar.js/navbar';


function ParticipantList() {
    const [participantdata, setParticipant] = useState([]);
    const history = useHistory();
    async function getdata() {
        try {
            const response = await axios.get(`${URL}/participant`);
            console.log(response.data.personData);
            toast(response.data.message);
            setParticipant(response.data.personData)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getdata();
    }, [])
    //delete data
    async function deletedata(id) {
        console.log(id);
        try {
            let response = await axios.delete(`${URL}/participant/delete/${id}`);
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
            <div className='part-container'>
                {participantdata.length === 0 ? <Loading></Loading> :
                    <div className='tournament_container'>
                        <div class="part-container">
                            <div class="my-part-card-container ">
                                {participantdata.map((list, index) => (
                                    <div className="my-part-card">
                                        <div className="my-card-header">
                                            <div className="my-part-card-image">
                                                <img src={list.image} alt={list.name}></img>
                                            </div>
                                        </div>
                                        <div className="my-card-body">
                                            <h3>{list.gamename}</h3>
                                            <p><span className='my_span'>Name: </span>{list.name}</p>
                                            <p><span className='my_span'>Email:</span>{list.email}</p>
                                            <p><span className='my_span'>Mobile:</span>{list.mobile}</p>
                                            <p><span className='my_span'>DOB:</span>{list.dob.slice(0, 10)}</p>
                                            <p><span className='my_span'>Tournament:</span>{list.tournament}</p>
                                            <div className='delete-button'>
                                                <Button onClick={() => deletedata(list._id)} variant="danger" ><span className='delete-btn'><MdDelete /></span></Button>
                                                <Button onClick={() => { history.push(`/edit/participant/${list._id}`) }} variant="warning" ><span className='edit-btn'><FaEdit /></span></Button>
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

export default ParticipantList;
