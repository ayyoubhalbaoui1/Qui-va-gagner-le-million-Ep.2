import React from 'react';
import SignupP from './components/signupParticipant'
import SigninP from './components/signinParticipant'
import AddQuestion from './components/addQuestion'
import login from './components/signinAdmin'
import AddAdmin from './components/addAdmin'
import AllParticipant from './components/AllParticipant'
import CreateGroup from './components/createGroup'
import JoinGroup from './components/joinGroup'
import Game from './components/game'
import Winer from './components/winer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Nav from './Nav'




function App() {
  return(
    <BrowserRouter>
    <Nav/>
      <Switch>
        <Route path="/signup" exact component={SignupP}/>
        <Route path="/signin" exact component={SigninP}/>
        <Route path="/addQuestion" exact component={AddQuestion}/>
        <Route path="/addAdmin" exact component={AddAdmin}/>
        <Route path="/login" exact component={login}/>
        <Route path="/allParticipant" exact component={AllParticipant}/>
        <Route path="/CreateGroup" exact component={CreateGroup}/>
        <Route path="/joinGroup" exact component={JoinGroup}/>
        <Route path="/game" exact component={Game}/>
        <Route path="/winer" render={(props) => <Winer {...props}/>}/>
      </Switch>
    
    </BrowserRouter>
    
  )
}

export default App;