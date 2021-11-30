import axios from 'axios'

class AuthenticationService {

    logInWithLocalAccount(username, password) 
    {
        return axios.post(`http://185.146.87.75:8080/radioactivitate/authenticate`, { username, password });
    }

    signUpWithLocalAccount(firstName, lastName, username, password) 
    {
        return axios.post(`http://185.146.87.75:8080/radioactivitate/user/signup`, { firstName, lastName, username, password });
    }

    registerSuccesfullLoginWithJwt(name, token) {
        sessionStorage.setItem("USER_SESSION_NAME", name)
        sessionStorage.setItem("TOKEN_SESSION_VALUE", token)
        this.axiosInterceptors(token)
    }

    createJWTToken(token) {
        return 'Bearer ' + token
      }

    axiosInterceptors() {
      axios.interceptors.request.use(
        (config) => {
          if (this.isUserLoggedIn()) {
            config.headers.authorization = this.createJWTToken(sessionStorage.getItem("TOKEN_SESSION_VALUE"));
          }
          return config
        }
      )
    }

    isUserLoggedIn()
    {
        let user = sessionStorage.getItem("USER_SESSION_NAME")
        if(user === null) 
            return false
        return true
    }

    logout()
    {
        sessionStorage.removeItem("USER_SESSION_NAME")
        sessionStorage.removeItem("TOKEN_SESSION_VALUE")
    }

    getUserData(username)
    {
      return axios.get(`http://185.146.87.75:8080/radioactivitate/user/getUserData/${username}`, {username})
    }

    changeUserData(username,firstname,lastname,address)
    {
      return axios.patch(`http://185.146.87.75:8080/radioactivitate/user/changeUserData/${username}/${firstname}/${lastname}/${address}`, {username,firstname,lastname,address})
    }

    verifyPassword(username,password)
    {
      return axios.get(`http://185.146.87.75:8080/radioactivitate/user/verifyPassword/${username}/${password}`, {username,password})
    }

    changeUserPassword(username,newPassword)
    {
      return axios.patch(`http://185.146.87.75:8080/radioactivitate/user/changePassword/${username}/${newPassword}`, {username,newPassword})
    }

    forgotPassword(username)
    {
      return axios.post(`http://185.146.87.75:8080/radioactivitate/forgot/${username}`, {username})
    }

    resetPassword(token,password)
    {
      return axios.post(`http://185.146.87.75:8080/radioactivitate/reset/${token}/${password}`, {token,password})
    }

}

export default new AuthenticationService()