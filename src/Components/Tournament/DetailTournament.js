import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { URL } from '../../backend link';
import Loading from '../Loading';
import Navbartop from '../NavBar.js/navbar';
import Button from 'react-bootstrap/Button';

function DetailTournament() {
    const [participantdisplay, setParticipantdisplay] = useState('none');
    const [winnerdisplay, setWinnerdisplay] = useState('none');
    //getting id params
    let { id } = useParams();
    const [selecteddata, setSelecteddata] = useState('');
    const history = useHistory();
    const token=sessionStorage.getItem('token');
    //fetching single data
    async function details() {
        const response = await axios.get(`${URL}/tournament/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}});
        console.log(response.data.Data);
        setSelecteddata(response.data.Data)
    }
    //useeffect
    useEffect(() => {
        details()
    }, []);
    function popmessage() {
        alert('Empty Data');
    }
    return (
        <Navbartop>
            <div>
                {selecteddata === '' ? <Loading></Loading> :

                    <div className='card top-container '>
                        <div className="card-header">
                            <button onClick={() => history.push(`/winner/add/${id}`)} className="btn btn-success">Add Winner(+)</button>
                            <button onClick={() => history.push(`/add/participant/${id}`)} className="btn btn-success">Add Participant (+)</button>
                        </div>
                        <div className='detail-card'>
                            <div className='detail-header  row'>
                                <h1>{selecteddata.gamename}</h1>
                                <div className='detail-header-image'>
                                    <img src={selecteddata.image} alt=''></img>
                                </div>
                            </div>
                            <div className='detail-body'>
                                <p><span></span>{selecteddata.description}</p>
                                <p><span>Starting date:</span>{selecteddata.startingdate.slice(0, 10)}</p>
                                <p><span>Ending date:</span>{selecteddata.endingdate.slice(0, 10)}</p>
                            </div>
                            {selecteddata.participant.length !== 0 ?
                                <div className='detail-part' style={{ display: participantdisplay }}>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>S.NO</th>
                                                <th>Participant Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selecteddata.participant.map((name, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{name}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div> : ""
                            }
                            {selecteddata.winners.length !== 0 ?
                                <div className='detail-part' style={{ display: winnerdisplay }}>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>S.NO</th>
                                                <th>Winers Name</th>
                                                <th>Prize</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selecteddata.winners.map((name, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{name.name}</td>
                                                    <td>{name.prize}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div> : ""
                            }
                        </div>
                        <div className='btn-container'>
                            {selecteddata.participant.length !== 0 ? <div>
                                {participantdisplay === 'none' ? <Button variant="primary" onClick={() => { setParticipantdisplay("block") }} size="sm">Show participant</Button> :
                                    <Button variant="primary" onClick={() => { setParticipantdisplay("none") }} size="sm">Hidden participant</Button>}
                            </div> :
                                <Button variant="primary" onClick={() => popmessage()} size="sm">Show participant</Button>}

                            {selecteddata.winners.length !== 0 ? <div>
                                {winnerdisplay === 'none' ? <Button variant="primary" onClick={() => { setWinnerdisplay('block') }} size="sm">Show Winners</Button> :
                                    <Button variant="primary" onClick={() => { setWinnerdisplay('none') }} size="sm">Hidden Winners</Button>}
                            </div> :
                                <Button variant="primary" onClick={() => popmessage()} size="sm">Show Winners</Button>}
                            <Button variant="primary" onClick={() => history.push('/dashboard')} size="sm">Back</Button>
                        </div>

                    </div>
                }

            </div>
        </Navbartop>
    )
}

export default DetailTournament