import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function Navbartop({ children }) {
    const history = useHistory()
    //logout
    function logout(){
        sessionStorage.clear();
        history.push('/login');
    }
    return (
        <div>
            <Navbar expand="lg" className="bg-success">
                <Container fluid>
                    <Navbar.Brand href="/">Game</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Button variant="outline-warning" className='nav-btn-Participant' onClick={() => { history.push('/participant') }}>Participant List</Button>
                            <Button variant="outline-warning" className='nav-btn-Tournament' onClick={() => { history.push('/dashboard') }}>Tournament List</Button>
                            <Button variant="outline-warning" className='nav-btn-Add' onClick={() => { history.push('/add/tournament') }}>Add Tournament</Button>
                        </Nav>
                        <Nav> <Button variant="outline-warning" className='nav-btn-out' onClick={() =>logout() }>Logout</Button></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Navbartop;