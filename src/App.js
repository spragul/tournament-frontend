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



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
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
      </Switch>

    </div>
  );
}

export default App;
