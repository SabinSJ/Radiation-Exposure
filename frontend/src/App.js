import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import LoginComponent from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import ForgotPassword from './Components/Pages/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword';
import PageNotFound from './Components/Pages/PageNotFound';
import MyChart from './Components/Pages/MyChart';
import UserProfile from './Components/Pages/UserProfile';
import GoogleMaps from "./Components/Pages/GoogleMaps";
import Contact from "./Components/Pages/Contact"

import AuthenticationRoute from './Components/AuthenticationRoute';

import AuthenticationService from './Components/api/AuthenticationService';

class App extends Component{
  

  requireLogin() {

    if (!AuthenticationService.isUserLoggedIn()) {
      
    }
  }

  render(){
    return (
      <>
         <Router>
          <Navbar/>
          <Switch>
            <AuthenticationRoute path='/' exact component={Home} onEnter={this.requireLogin()}/>
            <AuthenticationRoute path='/harta' exact component={GoogleMaps}/>
            <AuthenticationRoute path='/grafic' exact component={MyChart}/>
            <Route path='/contact' exact component={Contact}/>
            <AuthenticationRoute path='/profile' exact component={UserProfile}/>
            <Route path='/login' exact component={LoginComponent}/>
            <Route path='/signup' exact component={Signup}/>
            <Route path='/forgot' exact component={ForgotPassword}/>
            <Route path='/reset' exact component={ResetPassword}/>
            <Route component={PageNotFound}/>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
