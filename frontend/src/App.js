import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Room from './pages/Room';
import {createBrowserHistory} from 'history';

export const appHistory = createBrowserHistory();

function App() {
  return (
   <Router history = {appHistory}>
     <Switch>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/profile" exact={true} component={Profile}></Route>
      <Route path="/room/:roomID" component={Room}></Route>
    </Switch>
        </Router>
  );
}

export default App;
