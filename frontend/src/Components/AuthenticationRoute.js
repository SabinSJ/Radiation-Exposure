import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthenticationService from './api/AuthenticationService'

class AuthenticationRoute extends Component{

    render(){
        if(AuthenticationService.isUserLoggedIn())
            return <Route {...this.props}/>
        return <Redirect to="/login"/>
    }
}

export default AuthenticationRoute