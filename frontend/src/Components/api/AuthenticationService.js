import axios from 'axios'
//import { USER_NAME_SESSION_ATTRIBUTE_NAME, USER_TOKEN_SESSION_ATTRIBUTE_NAME } from '../../constants'

class AuthenticationService {

    logInWithLocalAccount(username, password) 
    {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, { username, password });
    }

    signUpWithLocalAccount(username, name, password) 
    {
        return axios.post('http://localhost:8080/user/signup', { username, name, password });
    }

    registerSuccesfullLoginWithJwt(name, token) {
        sessionStorage.setItem("USER_NAME_SESSION_ATTRIBUTE_NAME", name)
        sessionStorage.setItem("USER_TOKEN_SESSION_ATTRIBUTE_NAME", token)
    }

    isUserLoggedIn()
    {
        let user = sessionStorage.getItem("USER_NAME_SESSION_ATTRIBUTE_NAME")
        if(user === null) return false
        return true
    }

    logout()
    {
        sessionStorage.removeItem("USER_NAME_SESSION_ATTRIBUTE_NAME")
        sessionStorage.removeItem("USER_TOKEN_SESSION_ATTRIBUTE_NAME")
    }


}

export default new AuthenticationService()