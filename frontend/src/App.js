import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './Components/Pages/Home';
import LoginComponent from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import ForgotPassword from './Components/Pages/ForgotPassword';
import PageNotFound from './Components/Pages/PageNotFound';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/services' exact component={Home}/>
          <Route path='/products' exact component={Home}/>
          <Route path='/login' exact component={LoginComponent}/>
          <Route path='/signup' exact component={Signup}/>
          <Route path='/forgotpassword' exact component={ForgotPassword}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
