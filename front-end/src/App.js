import Forms from './components/Forms'
import Group from './components/Group'
import Lobby from './components/Lobby'
import Game from './components/Game'
import Winner from './components/Winner'
import Admin from './components/Admin components/Admin'
import AdminDashboard from './components/Admin components/AdminDashboard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Forms}/>
        <Route path="/Group" component={Group}/>
        <Route path="/Lobby" exact component={Lobby}/>
        <Route path="/Game" exact component={Game}/>
        <Route path="/Winner" exact component={Winner}/>
        <Route path="/Admin" exact component={Admin}/>
        <Route path="/Admin/Dashboard" exact component={AdminDashboard}/>
        <Route path="/Admin/Participants" exact component={AdminDashboard}/>
        <Route path="/Admin/Questions" exact component={AdminDashboard}/>
      </Switch>
    </Router>
  );
}

export default App;

