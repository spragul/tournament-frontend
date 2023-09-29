import './App.css';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import ParticipantList from './Components/Participant/Participantlist';
import Addparticipant from './Components/Participant/Addparticipant';
import Addtournament from './Components/Tournament/Addtournament';
import Edittournament from './Components/Tournament/Edittournament';
import Editparticipant from './Components/Participant/Editparticipant';
import TournamentList from './Components/Tournament/Tournamentlist';
import DetailTournament from './Components/Tournament/DetailTournament';
import Addwinner from './Components/Tournament/Addwinner';
import ColorSchemesExample from './Components/NavBar.js/navbar';
import { Login } from './Components/pages/login';
import { Signup } from './Components/pages/signuppage';
import { Forgot } from './Components/pages/forgotpass';
import { Resetpassword } from './Components/pages/resetpassword';
import { NM } from './Components/m';



function App() {
 let token=sessionStorage.getItem('token');
console.log(token);
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
         <NM/>
        </Route>
        <Route exact path='/dashboard'>
         <TournamentList/>
        </Route>
        <Route path='/navbar'>
          <ColorSchemesExample/>
        </Route>
        <Route path='/add/tournament'>
          <Addtournament />
        </Route>
        <Route path="/detail/:id">
          <DetailTournament />
        </Route>
        <Route path='/add/participant/:id'>
          <Addparticipant />
        </Route>
        <Route path='/participant'>
          <ParticipantList />
        </Route>
        <Route path='/edit/tournament/:id'>
          <Edittournament />
        </Route>
        <Route path='/edit/participant/:id'>
          <Editparticipant />
        </Route>
        <Route path='/winner/add/:id'>
          <Addwinner />
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/forgotpassword'>
          <Forgot/>
        </Route>
        <Route path='/resetpassword/:id/:token'>
          <Resetpassword/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
