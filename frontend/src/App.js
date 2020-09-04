import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';

import {createBrowserHistory} from 'history';

export const appHistory = createBrowserHistory();

function App() {
  return (
   <Router history = {appHistory}>
     <Route path="/" exact={true} component={Home}></Route>
     <Route path="/profile" exact={true} component={Profile}></Route>
   </Router>
  );
}

export default App;
